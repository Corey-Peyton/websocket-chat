<template>
  <div class="chat">
    <chat-messages />
    <chat-users-bar />
  </div>
</template>

<script>
export default {
  name: 'Chat',
}
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  margin: 20px 80px 50px 80px;
  height: 650px;
  background-color: #d7dfe7;
}
</style>
