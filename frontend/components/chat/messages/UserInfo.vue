<template>
  <div class="user-info-container">
    <div v-if="interlocutor" class="user-info">
      <img class="user-info__avatar" :src="avatar" alt="User avatar" />
      <section class="user-info__content">
        <span class="user-info__content__name">{{
          interlocutor.username
        }}</span>
        <span class="user-info__content__description">Some description</span>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    interlocutor: {
      type: [Object, null],
      default: null,
    },
  },
  computed: {
    avatar() {
      return require(`@/assets/images/${this.interlocutor.avatar}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.user-info {
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

.user-info-container {
  background-color: #becbd9;
  height: 170px;
  margin-bottom: 20px;
}
</style>
