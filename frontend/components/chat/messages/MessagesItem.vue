<template>
  <div class="message">
    <section class="message__header">
      <span>{{ message.sender }}</span>
      <span>{{ formattedDate }}</span>
    </section>
    <section class="message__body">
      {{ message.content }}
    </section>
  </div>
</template>

<script>
export default {
  name: 'MessagesItem',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      return this.message.time.toLocaleString('en-UA', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.message {
  height: 80px;
  width: 640px;
  margin: 0 20px 20px 20px;

  &__header {
    height: 35px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #becbd9;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &__body {
    height: 45px;
    padding: 15px;
    background-color: #f4f8fb;
    position: relative;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    &::after {
      content: '';
      height: 15px;
      width: 15px;
      position: absolute;
      transform: rotate(45deg);
      bottom: 20px;
      left: -5px;
      background-color: #f4f8fb;
    }
  }
}
</style>
