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

  socket.on('users', (users) => {
    store.commit({
      type: 'interlocutor/loadUsers',
      users,
    })
  })

  socket.on('bots', (bots) => {
    store.commit({
      type: 'interlocutor/loadBots',
      bots,
    })
  })

  socket.on('user_connected', (user) => {
    store.commit({
      type: 'interlocutor/addUser',
      user,
    })
  })

  socket.on('user_disconnected', (user) => {
    store.commit({
      type: 'interlocutor/setOffline',
      username: user.username,
    })
  })

  socket.on('messages', (messages) => {
    const parsedMessages = messages.map((message) => ({
      ...message,
      sentAt: new Date(Date.parse(message.sentAt)),
    }))

    store.commit({
      type: 'message/loadMessages',
      messages: parsedMessages,
    })
  })

  socket.on('message', (message) => {
    store.commit({
      type: 'message/addMessage',
      message: { ...message, sentAt: new Date(message.sentAt) },
    })
  })

  inject('socket', socket)
}
