<template>
  <section class="users-search">
    <input
      class="users-search__input"
      type="text"
      placeholder="Search..."
      :value="usernameFilter"
      @input="$emit('setUsernameFilter', $event.target.value)"
    />
  </section>
</template>

<script>
export default {
  name: 'UsersSearch',
  props: {
    usernameFilter: {
      type: String,
      required: true,
    },
  },
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
