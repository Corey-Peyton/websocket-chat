<template>
  <div class="messages">
    <chat-messages-user-info />
    <chat-messages-list />
  </div>
</template>

<script>
export default {
  name: 'Messages',
}
</script>

<style lang="scss" scoped>
.messages {
  height: 100%;
  width: 880px;
}
</style>
