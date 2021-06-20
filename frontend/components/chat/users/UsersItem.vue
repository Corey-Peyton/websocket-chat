<template>
  <div
    class="users-item"
    :class="isActiveInterlocutor ? 'users-item__active' : null"
    @click="onClick"
  >
    <div class="users-item__avatar">
      <img :src="avatar" />
      <img class="users-item__avatar__status-icon" :src="statusIcon" />
    </div>
    <div class="users-item__body">
      <span class="users-item__body__username">{{ user.username }}</span>
      <span class="users-item__body__last_message"
        >Lorem ipsum dolor sit, amet consecteturadipisicing elit. Eius ex quo
        aliquam vero doloremque assumenda, unde soluta perferendis beatae nemo
        tempore corrupti veniam enim obcaecati totam quasi iste placeat
        aspernatur.</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersItem',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatar() {
      return require(`@/assets/images/${this.user.avatar}`)
    },
    statusIcon() {
      const icon = this.user.isOnline ? 'online.png' : 'offline.png'
      return require(`@/assets/images/${icon}`)
    },
    isActiveInterlocutor() {
      return (
        this.$store.state.interlocutor.currentInterlocutorUsername ===
        this.user.username
      )
    },
  },
  methods: {
    onClick() {
      this.$store.commit({
        type: 'interlocutor/setCurrentInterlocutorUsername',
        username: this.user.username,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.users-item {
  display: flex;
  width: 100%;
  padding: 5px 15px;
  max-height: 70px;

  &__avatar {
    height: 60px;
    width: 60px;
    position: relative;

    &__status-icon {
      height: 15px;
      width: 15px;
      position: absolute;
      bottom: -5px;
      right: -5px;
      z-index: 1;
    }
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 2px 0 2px 10px;

    &__username {
      width: 100%;
      font-family: 'OpenSans-Semibold', sans-serif;
      font-size: 12pt;
    }

    &__last_message {
      width: 100%;
      font-family: 'OpenSans', sans-serif;
      font-size: 10pt;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }

  &__active {
    background-color: #f8f8f8;
  }
}
</style>
