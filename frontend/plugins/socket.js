import io from 'socket.io-client'
import config from '../config'

export default ({ store }, inject) => {
  const { socketServerHost, socketServerPort } = config
  const url = `${socketServerHost}:${socketServerPort}`

  const socket = io(url, {
    query: {
      username: localStorage.getItem('username'),
    },
  })

  // User information
  socket.on('user', (user) => {
    const { username, avatar } = user
    localStorage.setItem('username', username)
    localStorage.setItem('avatar', avatar)

    store.commit({
      type: 'user/setUsername',
      username,
    })
  })

  // Available interlocutors
  socket.on('interlocutors', (users) => {
    store.commit({
      type: 'interlocutor/loadUsers',
      users,
    })
  })

  // Bots
  socket.on('bots', (bots) => {
    store.commit({
      type: 'interlocutor/loadBots',
      bots,
    })
  })

  // New interlocutor connected
  socket.on('interlocutor_connected', (user) => {
    store.commit({
      type: 'interlocutor/addUser',
      user,
    })
  })

  // Interlocutor disconnected
  socket.on('interlocutor_disconnected', (user) => {
    store.commit({
      type: 'interlocutor/setOffline',
      username: user.username,
    })
  })

  // User's messages
  socket.on('messages', (messages) => {
    const parsedMessages = messages.map((message) => ({
      ...message,
      sentAt: new Date(message.sentAt),
    }))

    store.commit({
      type: 'message/loadMessages',
      messages: parsedMessages,
    })
  })

  // New message
  socket.on('message', (message) => {
    store.commit({
      type: 'message/addMessage',
      message: { ...message, sentAt: new Date(message.sentAt) },
    })
  })

  // Make socket object available for every component to emit events
  inject('socket', socket)
}
