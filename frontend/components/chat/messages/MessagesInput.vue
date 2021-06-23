<template>
  <div class="messages-input-container">
    <input
      v-model="messageContent"
      class="messages-input-container__input"
      type="text"
      placeholder="Start chatting!"
      @keyup.enter="sendMessage"
    />
    <button class="messages-input-container__send-button" @click="sendMessage">
      Send message
    </button>
  </div>
</template>

<script>
export default {
  name: 'MessagesInput',
  data() {
    return {
      messageContent: '',
    }
  },
  methods: {
    sendMessage() {
      // Empty message is not permited
      if (!this.messageContent.trim()) return

      this.$emit('sendMessage', this.messageContent)
      this.messageContent = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.messages-input-container {
  display: flex;
  margin-top: 15px;
  padding: 0 30px 0 10px;
  width: 100%;

  &__input {
    min-width: 630px;
    width: 100%;
    height: 35px;
    border-radius: 5px;
    border: none;
    padding: 0 15px;
    font-family: 'OpenSans', sans-serif;
    font-size: 14px;
    line-height: 14px;
  }

  &__input:focus {
    outline: none;
    border: 2px solid #74b9ef;
  }

  &__send-button {
    margin-left: 10px;
    width: 195px;
    height: 35px;
    background-color: #428bca;
    border: 1px solid #357ebc;
    border-radius: 4px;
    color: #fff;
    font-family: 'OpenSans', sans-serif;
    font-size: 14px;
  }
}
</style>
