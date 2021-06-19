<template>
  <div>
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
      ],
    }
  },
}
</script>
