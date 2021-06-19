<template>
  <div class="user-info">
    <img
      class="user-info__avatar"
      src="https://i.pinimg.com/originals/b1/6f/22/b16f228b5dec74c4b870ed89fedde939.png"
      alt="User avatar"
    />
    <section class="user-info__content">
      <span class="user-info__content__name">Reverse bot</span>
      <span class="user-info__content__description">Some description</span>
    </section>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
}
</script>

<style lang="scss" scoped>
.user-info {
  background-color: #becbd9;
  height: 170px;
  display: flex;

  &__avatar {
    height: 170px;
    width: 170px;
  }

  &__content {
    margin: 20px;
    &__name {
      display: block;
      width: 100%;
      font-family: 'OpenSans-Semibold', sans-serif;
      font-size: 24px;
      color: #333;
    }

    &__description {
      width: 100%;
      font-size: 16px;
      font-family: 'OpenSans', sans-serif;
      color: #354149;
    }
  }
}
</style>
