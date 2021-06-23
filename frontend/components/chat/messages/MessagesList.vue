<template>
  <div ref="list" class="chat-messages-list">
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
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
  watch: {
    messages() {
      // Scroll to bottom on the messages list change
      this.$nextTick(function () {
        this.scrollToBottom()
      })
    },
  },
  mounted() {
    this.scrollToBottom()
  },
  methods: {
    scrollToBottom() {
      const list = this.$refs.list
      list.scrollTop = list.scrollHeight
    },
  },
}
</script>

<style lang="scss" scoped>
.chat-messages-list {
  overflow-y: scroll;
  height: 385px;
}
</style>
