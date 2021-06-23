<template>
  <div class="users-bar">
    <chat-users-bar-tabs
      :online-filter="onlineFilter"
      @setOnlineFilter="setOnlineFilter"
    />
    <chat-users-list :interlocutors="interlocutors" />
    <chat-users-search
      :username-filter="usernameFilter"
      @setUsernameFilter="setUsernameFilter"
    />
  </div>
</template>

<script>
export default {
  name: 'ChatUsersBar',
  data() {
    return {
      onlineFilter: true,
      usernameFilter: '',
    }
  },
  computed: {
    interlocutors() {
      let interlocutors = this.$store.getters['interlocutor/interlocutors']

      if (this.onlineFilter)
        interlocutors = interlocutors.filter(
          (interlocutor) => interlocutor.isOnline
        )

      if (this.usernameFilter)
        interlocutors = interlocutors.filter((interlocutor) => {
          const username = interlocutor.username.toLowerCase()
          return username.includes(this.usernameFilter.trim().toLowerCase())
        })

      return [...interlocutors]
    },
  },
  methods: {
    setUsernameFilter(usernameFilter) {
      this.usernameFilter = usernameFilter
    },
    setOnlineFilter(value) {
      this.onlineFilter = value
    },
  },
}
</script>

<style lang="scss" scoped>
.users-bar {
  background-color: #fff;
  min-width: 260px;
  max-width: 350px;
  height: 100%;
}
</style>
