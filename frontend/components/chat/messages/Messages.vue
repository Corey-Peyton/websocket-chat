<template>
  <div class="messages">
    <chat-messages-user-info :interlocutor="interlocutor" />
    <chat-messages-list v-if="interlocutor" />
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
