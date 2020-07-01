import _ from 'lodash'

/**
 * @callback listener
 * @param event event that fired the listener
 * @param socket the socket that the listener is bound to
 */

/**
 * @callback messageListener
 * @param message the message that was received by the socket
 * @param event event that fired the listener
 * @param socket the socket that the listener is bound to
 */

class ApiWebsocket {
  /* Mediates the interaction with API through WebSockets */
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  /**
   * Get's the full WebSocket URL from the API path
   * @param {string} path API path. (For ws://localhost:8000/ws/registry/plot, path='registry/plot')
   * @returns {string} url
   */
  url(path) {
    const url = new URL(`${this.baseUrl}${path}`)
    return url
  }

  /**
   * Executes the connection to the API through WebSockets and sets its listeners
   * @param {string} path API path (E.g.: 'registry/plot').
   * @param {object} listeners Object containing the event listeners for the connection.
   * @param {listener} listeners.onConnect Socket onopen listener.
   * @param {messageListener|Object.<messageListener>} listeners.onReceiveHandlers socket onmessage listener. If it's an object, it will
   * call onReceiveHandlers[message.type] when the event fires.
   * @param {listener} onError Socket onerror listener.
   */
  connect(path, { onConnect, onReceiveHandlers, onError }) {
    // Create WebSocket
    const socket = new WebSocket(this.url(path))

    // onConnect
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

// TODO: Get url from env
export default new ApiWebsocket('ws://localhost:8000/ws/')
