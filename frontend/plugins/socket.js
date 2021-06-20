import io from 'socket.io-client'

export default ({ store }, inject) => {
  const socket = io('ws://localhost:3000')
  inject('socket', socket)
}
