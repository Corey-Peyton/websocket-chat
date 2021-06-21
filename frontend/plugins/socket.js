import io from 'socket.io-client'

export default ({ store }, inject) => {
  const socket = io('http://localhost:3000')
  inject('socket', socket)
}
