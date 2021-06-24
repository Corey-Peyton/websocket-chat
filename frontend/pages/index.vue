<template>
  <div>
    <layout-navbar />
    <chat />
  </div>
</template>

<script>
export default {
  beforeMount() {
    // Set up socket event handlers
    // User information
    this.$socket.on('user', (user) => {
      const { username } = user
      localStorage.setItem('username', username)

      this.$store.commit({
        type: 'user/setUsername',
        username,
      })
    })

    // Available interlocutors
    this.$socket.on('interlocutors', (users) => {
      this.$store.commit({
        type: 'interlocutor/loadUsers',
        users,
      })
    })

    // Bots
    this.$socket.on('bots', (bots) => {
      this.$store.commit({
        type: 'interlocutor/loadBots',
        bots,
      })
    })

    // New interlocutor connected
    this.$socket.on('interlocutor_connected', (user) => {
      this.$store.commit({
        type: 'interlocutor/addUser',
        user,
      })
    })

    // Interlocutor disconnected
    this.$socket.on('interlocutor_disconnected', (user) => {
      this.$store.commit({
        type: 'interlocutor/setOffline',
        username: user.username,
      })
    })

    // User's messages
    this.$socket.on('messages', (messages) => {
      const parsedMessages = messages.map((message) => ({
        ...message,
        sentAt: new Date(message.sentAt),
      }))

      this.$store.commit({
        type: 'message/loadMessages',
        messages: parsedMessages,
      })
    })

    // New message
    this.$socket.on('message', (message) => {
      this.$store.commit({
        type: 'message/addMessage',
        message: { ...message, sentAt: new Date(message.sentAt) },
      })
    })
  },
}
</script>
