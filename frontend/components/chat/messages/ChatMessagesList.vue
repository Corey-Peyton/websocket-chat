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
  name: 'ChatMessagesList',
  data() {
    return {
      messages: [
        {
          sender: 'Patrick',
          content: 'Hello',
          time: new Date(),
        },
        {
          sender: 'Spanch Bob',
          content: 'Bye',
          time: new Date(),
        },
        {
          sender: 'Patrick',
          content: 'How is Squidwart?',
          time: new Date(),
        },
        {
          sender: 'Spanch Bob',
          content: 'He is okey',
          time: new Date(),
        },
        {
          sender: 'Patrick',
          content: 'That is good',
          time: new Date(),
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.chat-messages-list {
  overflow-y: auto;
  height: 385px;
}
</style>
