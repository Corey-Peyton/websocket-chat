<template>
  <section class="users-search">
    <input class="users-search__input" type="text" placeholder="Search..." />
  </section>
</template>

<script>
export default {
  name: 'UsersSearch',
}
</script>

<style lang="scss" scoped>
.users-search {
  width: 100%;
  padding: 0 10px;
  margin: 20px 0;

  &__input {
    font-family: 'OpenSans', sans-serif;
    border: 1px solid #ccc;
    border-radius: 3px;
    height: 35px;
    padding: 0 15px;
    width: 100%;
  }
}
</style>
