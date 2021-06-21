<template>
  <div class="messages">
    <chat-messages-user-info :interlocutor="interlocutor" />
    <chat-messages-list v-if="interlocutor" :messages="messages" />
    <chat-messages-input v-if="interlocutor" @sendMessage="sendMessage" />
  </div>
</template>

<script>
export default {
  name: 'Messages',
  computed: {
    interlocutor() {
      const currentInterlocutorUsername =
        this.$store.state.interlocutor.currentInterlocutorUsername

      const interlocutors = this.$store.state.interlocutor.interlocutors
      const bots = this.$store.state.interlocutor.bots

      if (currentInterlocutorUsername)
        return [...interlocutors, ...bots].find(
          (i) => i.username === currentInterlocutorUsername
        )

      return null
    },

    messages() {
      const interlocutorUsername =
        this.$store.state.interlocutor.currentInterlocutorUsername
      return this.$store.state.message.messages
        .filter(
          (message) =>
            message.sender === interlocutorUsername ||
            message.receiver === interlocutorUsername
        )
        .sort((a, b) => a.sentAt < b.sentAt)
    },
  },
  methods: {
    sendMessage(content) {
      const sender = this.$store.state.user.username
      const receiver =
        this.$store.state.interlocutor.currentInterlocutorUsername

      const message = {
        sender,
        receiver,
        content,
        sentAt: new Date(),
      }

      if (receiver.includes('bot')) this.$socket.emit('botmessage', message)
      else this.$socket.emit('message', message)
      this.$store.dispatch({ type: 'message/addMessage', message })
    },
  },
}
</script>

<style lang="scss" scoped>
.messages {
  height: 100%;
  width: 100%;
  min-width: 880px;
}
</style>
