import _ from 'lodash'
import store from '../redux/store'

class ApiWebsocket {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  url(path) {
    const token = store.getState().session.access
    const url = new URL(`${this.baseUrl}${path}?token=${token}`)
    return url
  }

  connect(path, { onConnect, onReceiveHandlers, onError }) {
    const socket = new WebSocket(this.url(path))

    socket.onopen = (event) => onConnect(event, socket)

    if (typeof onReceiveHandlers === 'function') {
      socket.onmessage = (event) => onReceiveHandlers(event, socket)
    } else if (_.isPlainObject(onReceiveHandlers)) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data)
        if (typeof onReceiveHandlers[message.type] === 'function') {
          onReceiveHandlers[message.type](message, event, socket)
        }
      }
    } else {
      socket.close()
      throw new Error(
        `Unhandled type "${typeof onReceiveHandlers}" for onReceiveHandlers`,
      )
    }

    socket.onerror = (event) => onError(event, socket)

    return socket
  }
}

export default new ApiWebsocket('ws://localhost:8000/ws/')
