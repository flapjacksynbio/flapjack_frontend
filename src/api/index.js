import store from '../redux/store'
import {
  receiveAccessTokens,
  logoutCurrentUser,
  loggingIn,
  setUserInfo,
} from '../redux/actions/session'
import ee from 'events'

const READY_EVENT = 'READY_EVENT'

// TODO: Handle errors in this class, and return error messages

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.baseHeaders = {
      'content-type': 'application/json',
    }

    this.emitter = new ee.EventEmitter()
    this.isInitialized = new Promise((resolve) => {
      this.emitter.once('READY_EVENT', () => resolve())
    })
  }

  async authedHeaders() {
    await this.isInitialized
    const accessToken = store.getState().session.access
    if (!accessToken) return this.baseHeaders
    return {
      ...this.baseHeaders,
      Authorization: `Bearer ${accessToken}`,
    }
  }

  url(path, query = {}) {
    const url = new URL(`${this.baseUrl}${path}`)
    Object.entries(query).forEach(([k, v]) => url.searchParams.append(k, v))
    return url
  }

  async get(path, headers, query) {
    const authedHeaders = await this.authedHeaders()
    return fetch(this.url(path, query), {
      method: 'GET',
      headers: { ...authedHeaders, ...headers },
    }).then((resp) => resp.json())
  }

  async post(path, body, headers, query) {
    const authedHeaders = await this.authedHeaders()
    return fetch(this.url(path, query), {
      method: 'POST',
      headers: { ...authedHeaders, ...headers },
      body: JSON.stringify(body),
    }).then((resp) => resp.json())
  }

  async register(body) {
    const response = await fetch(this.url('auth/register/'), {
      method: 'POST',
      headers: this.baseHeaders,
      body: JSON.stringify(body),
    }).then((resp) => resp.json())

    if (!response || !response.access || !response.refresh) {
      return { errors: response }
    }

    return this.logIn({ username: body.username, password: body.password })
  }

  async logIn(body) {
    const response = await fetch(this.url('auth/log_in/'), {
      method: 'POST',
      headers: this.baseHeaders,
      body: JSON.stringify(body),
    }).then((resp) => resp.json())

    if (!response || !response.access || !response.refresh) {
      throw new Error('API error')
    }

    store.dispatch(receiveAccessTokens(response))
    store.dispatch(setUserInfo(response))
    return response
  }

  async refresh(refresh) {
    if (!refresh && (!store.session || !store.session.refresh)) {
      this.emitter.emit(READY_EVENT, true)
      throw new Error('No refresh token stored')
    }

    store.dispatch(loggingIn(true))

    const response = await fetch(this.url('auth/refresh/'), {
      method: 'POST',
      headers: this.baseHeaders,
      body: JSON.stringify({ refresh: refresh || store.getState().session.refresh }),
    })
      .then((resp) => resp.json())
      .finally((resp) => {
        store.dispatch(loggingIn(false))
        return resp
      })

    if (!response || !response.access) {
      store.dispatch(logoutCurrentUser())
      this.emitter.emit(READY_EVENT, true)
      throw new Error('API error')
    }

    store.dispatch(receiveAccessTokens({ refresh, access: response.access }))
    this.emitter.emit(READY_EVENT, true)
    return response
  }

  async logOut() {
    return store.dispatch(logoutCurrentUser())
  }
}

export default new Api('http://localhost:8000/api/')
