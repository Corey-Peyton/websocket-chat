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
@import '@/assets/variables.scss';

.chat {
  display: flex;
  margin: 20px 80px 50px 80px;
  height: 650px;
  min-width: 880px;
  background-color: #d7dfe7;
}

@media screen and (max-width: $md) {
  .chat {
    min-width: 0;
    width: 100%;
    height: 100%;
    flex-direction: column-reverse;
    margin: 20px 0;
  }
}
</style>
