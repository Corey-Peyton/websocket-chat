<template>
  <div class="users-list">
    <chat-users-item
      v-for="interlocutor in interlocutors"
      :key="interlocutor.username"
      :user="interlocutor"
    />
  </div>
</template>

<script>
export default {
  name: 'UsersList',
  computed: {
    interlocutors() {
      return this.$store.state.interlocutor.interlocutors
    },
  },
}
</script>

<style lang="scss" scoped>
.users-list {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
}
</style>
