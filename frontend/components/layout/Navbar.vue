<template>
  <nav class="navbar">
    <span class="navbar__title">Chat bots 2.0</span>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 80px;
  background-color: #fff;

  &__title {
    position: absolute;
    color: #333;
    font-size: 20pt;
    font-family: sans-serif;
    transform: translate(80px, 36px);
  }
}
</style>
