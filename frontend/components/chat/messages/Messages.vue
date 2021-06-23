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

      const interlocutors = this.$store.getters['interlocutor/interlocutors']

      if (currentInterlocutorUsername)
        return [...interlocutors].find(
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
        .sort((a, b) => a.sentAt - b.sentAt)
    },
  },
  methods: {
    sendMessage(content) {
      const senderUsername = this.$store.state.user.username
      const receiver = this.interlocutor

      const message = {
        sender: senderUsername,
        receiver: receiver.username,
        content,
        sentAt: new Date(),
      }

      if (receiver.isBot) this.$socket.emit('botmessage', message)
      else this.$socket.emit('message', message)
      this.$store.commit({ type: 'message/addMessage', message })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
.messages {
  height: 100%;
  width: 100%;
  min-width: 880px;
}

@media screen and (max-width: $md) {
  .messages {
    min-width: 0;
    width: 100%;
  }
}
</style>
