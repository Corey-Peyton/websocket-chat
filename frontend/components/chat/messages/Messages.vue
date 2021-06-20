<template>
  <div class="messages">
    <chat-messages-user-info :interlocutor="interlocutor" />
    <chat-messages-list v-if="interlocutor" :messages="messages" />
    <chat-messages-input v-if="interlocutor" />
  </div>
</template>

<script>
export default {
  name: 'Messages',
  computed: {
    interlocutor() {
      const currentInterlocutorUsername =
        this.$store.state.interlocutor.currentInterlocutorUsername

      if (currentInterlocutorUsername)
        return this.$store.state.interlocutor.interlocutors.find(
          (i) => i.username === currentInterlocutorUsername
        )

      return null
    },

    messages() {
      const interlocutorUsername =
        this.$store.state.interlocutor.currentInterlocutorUsername
      return this.$store.state.message.messages.filter(
        (message) =>
          message.sender === interlocutorUsername ||
          message.receiver === interlocutorUsername
      )
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
