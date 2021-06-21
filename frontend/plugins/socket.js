import io from 'socket.io-client'

export default ({ store }, inject) => {
  const socket = io('http://localhost:3000', {
    query: {
      username: localStorage.getItem('username'),
    },
  })

  socket.on('user', (user) => {
    const { username, avatar } = user
    localStorage.setItem('username', username)
    localStorage.setItem('avatar', avatar)
  })

  inject('socket', socket)
}
