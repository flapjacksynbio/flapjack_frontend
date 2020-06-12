import store from '../redux/store'
import {
  receiveAccessTokens,
  logoutCurrentUser,
  loggingIn,
} from '../redux/actions/session'

// TODO: Handle errors in this class, and return error messages

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.baseHeaders = {
      'content-type': 'application/json',
    }
    this.authedHeaders = {
      ...this.baseHeaders,
    }
  }

  url(path, query = {}) {
    const url = new URL(`${this.baseUrl}${path}`)
    Object.entries(query).forEach(([k, v]) => url.searchParams.append(k, v))
    return url
  }

  async get(path, headers, query) {
    return fetch(this.url(path, query), {
      method: 'GET',
      headers: { ...this.authedHeaders, ...headers }, // TODO: Add auth header
    }).then((resp) => resp.json())
  }

  async post(path, body, headers, query) {
    return fetch(this.url(path, query), {
      method: 'POST',
      headers: { ...this.authedHeaders, ...headers }, // TODO: Add auth header
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

    store.dispatch(receiveAccessTokens(response))
    return response
  }

  async logIn(body) {
    const response = await fetch(this.url('auth/token/'), {
      method: 'POST',
      headers: this.baseHeaders,
      body: JSON.stringify(body),
    }).then((resp) => resp.json())

    if (!response || !response.access || !response.refresh) {
      throw new Error('API error')
    }

    store.dispatch(receiveAccessTokens(response))
    return response
  }

  async refresh(refresh) {
    if (!refresh && (!store.session || !store.session.refresh)) {
      throw new Error('No refresh token stored')
    }

    store.dispatch(loggingIn(true))

    const response = await fetch(this.url('auth/refresh/'), {
      method: 'POST',
      headers: this.baseHeaders,
      body: JSON.stringify({ refresh: refresh || store.session.refresh }),
    })
      .then((resp) => resp.json())
      .finally((resp) => {
        store.dispatch(loggingIn(false))
        return resp
      })

    if (!response || !response.access) {
      store.dispatch(logoutCurrentUser())
      throw new Error('API error')
    }

    store.dispatch(receiveAccessTokens({ refresh, access: response.access }))
    return response
  }

  async logOut() {
    return store.dispatch(logoutCurrentUser())
  }
}

export default new Api('http://localhost:8000/api/')
