<template>
  <div class="users-bar">
    <chat-users-bar-tabs />
    <chat-users-list />
    <chat-users-search />
  </div>
</template>

<script>
export default {
  name: 'ChatUsersBar',
}
</script>

<style lang="scss" scoped>
.users-bar {
  background-color: #fff;
  min-width: 260px;
  height: 100%;
}
</style>
