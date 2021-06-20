<template>
  <section class="users-bar-tabs">
    <button
      class="users-bar-tabs__button"
      :class="onlineFilter ? null : 'users-bar-tabs__button-inactive'"
      @click="$emit('setOnlineFilter', true)"
    >
      Online
    </button>
    <button
      class="users-bar-tabs__button"
      :class="onlineFilter ? 'users-bar-tabs__button-inactive' : null"
      @click="$emit('setOnlineFilter', false)"
    >
      All
    </button>
  </section>
</template>

<script>
export default {
  name: 'UsersBarTabs',
  props: {
    onlineFilter: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.users-bar-tabs {
  display: flex;

  &__button {
    font-family: 'OpenSans', sans-serif;
    font-size: 14pt;
    background-color: #fff;
    border: none;
    width: 50%;
    height: 40px;
  }

  &__button-inactive {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
  }
}
</style>
