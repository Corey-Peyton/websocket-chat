<template>
  <div class="messages-input-container">
    <input
      class="messages-input-container__input"
      type="text"
      placeholder="Start chatting!"
    />
    <button class="messages-input-container__send-button">Send message</button>
  </div>
</template>

<script>
export default {
  name: 'MessagesInput',
}
</script>

<style lang="scss" scoped>
.messages-input-container {
  display: flex;
  margin: 15px 30px 0 10px;

  &__input {
    width: 630px;
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
