import io from 'socket.io-client'
import config from '../config'

export default (_, inject) => {
  const { socketServerHost, socketServerPort } = config
  const url = `${socketServerHost}:${socketServerPort}`

  const socket = io(url, {
    query: {
      username: localStorage.getItem('username'),
    },
  })

  // Make socket object available for every component to emit events
  inject('socket', socket)
}
