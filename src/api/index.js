import store from '../redux/store'
import { receiveAccessTokens, logoutCurrentUser, finishedLoggingIn } from '../redux/actions/session'

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.baseHeaders = {
      'content-type': 'application/json'
    }
    this.authedHeaders = {
      ...this.baseHeaders
    }
  }

  url(path) {
    return `${this.baseUrl}${path}`
  }

  async get(path, headers, query) {
    return fetch(this.url(path), {
      method: 'GET',
      headers: { ...this.authedHeaders, ...headers }, // TODO: Add auth header
      query
    }).then(resp => resp.json())
  }

  async post(path, body, headers, query) {
    return fetch(this.url(path), {
      method: 'POST',
      headers: { ...this.authedHeaders, ...headers }, // TODO: Add auth header
      body: JSON.stringify(body),
      query
    }).then(resp => resp.json())
  }

  async register(body) {
    const response = await fetch(this.url('jwtauth/register/'), {
      method: 'POST',
      headers: this.baseHeaders,
      body: JSON.stringify(body)
    }).then(resp => resp.json())

    if (!response || !response.access || !response.refresh) {
      throw new Error('API error')
    }

    store.dispatch(receiveAccessTokens(response))
    return response
  }

  async logIn(body) {
    const response = await fetch(this.url('token/'), {
      method: 'POST',
      headers: this.baseHeaders,
      body: JSON.stringify(body),
    }).then(resp => resp.json())

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

    const response = await fetch(this.url('refresh/'), {
      method: 'POST',
      headers: this.baseHeaders,
      body: JSON.stringify({ refresh: refresh || store.session.refresh }),
    })
      .then(resp => resp.json())
      .finally(resp => {
        store.dispatch(finishedLoggingIn())
        return resp
      })
    
    if (!response || !response.access) {
      throw new Error('API error')
    }

    store.dispatch(receiveAccessTokens({ refresh, access: response.access }))
    return response
  }

  async logOut() {
    return store.dispatch(logoutCurrentUser())
  }
}

export default new Api('http://localhost:8989/api/')