import io from 'socket.io-client'

export default ({ store }, inject) => {
  const socket = io('http://localhost:3000', {
    query: {
      username: localStorage.getItem('username'),
    },
    forceNew: false,
  })

  socket.on('user', (user) => {
    const { username, avatar } = user
    localStorage.setItem('username', username)
    localStorage.setItem('avatar', avatar)

    store.commit({
      type: 'user/setUsername',
      username,
    })
  })

  socket.on('interlocutors', (interlocutors) => {
    store.commit({
      type: 'interlocutor/setInterlocutors',
      interlocutors,
    })
  })

  socket.on('interlocutor_connected', (interlocutor) => {
    store.commit({
      type: 'interlocutor/addInterlocutor',
      interlocutor,
    })
  })

  socket.on('interlocutor_disconnected', (interlocutor) => {
    store.commit({
      type: 'interlocutor/setOffline',
      username: interlocutor.username,
    })
  })

  socket.on('messages', (messages) => {
    store.commit({
      type: 'message/loadMessages',
      messages,
    })
  })

  socket.on('message', (message) => {
    store.commit({
      type: 'message/addMessage',
      message,
    })
  })

  inject('socket', socket)
}
