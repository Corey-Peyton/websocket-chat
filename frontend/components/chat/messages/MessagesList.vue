<template>
  <div class="chat-messages-list">
    <chat-messages-item
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
    />
  </div>
</template>

<script>
export default {
  name: 'MessagesList',
  computed: {
    messages() {
      return this.$store.state.message.messages
    },
  },
}
</script>

<style lang="scss" scoped>
.chat-messages-list {
  overflow-y: auto;
  height: 385px;
}
</style>
