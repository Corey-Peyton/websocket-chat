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
  props: {
    interlocutors: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.users-list {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 530px;
  overflow-y: auto;
}
</style>
