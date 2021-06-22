export const state = () => ({
  users: [],
  bots: [],
  currentInterlocutorUsername: null,
})

export const getters = {
  interlocutors: (state) => [...state.bots, ...state.users],
}

export const mutations = {
  setCurrentInterlocutorUsername(state, payload) {
    state.currentInterlocutorUsername = payload.username
  },
  loadUsers(state, payload) {
    state.users = [...payload.users]
  },
  addUser(state, payload) {
    state.users = [
      ...state.users.filter((user) => user.username !== payload.user.username),
      payload.user,
    ]
  },
  setOffline(state, payload) {
    state.users = state.users.map((user) =>
      user.username === payload.username ? { ...user, isOnline: false } : user
    )
  },
  loadBots(state, payload) {
    state.bots = payload.bots.map((bot) => ({
      ...bot,
      isBot: true,
      isOnline: true,
    }))
  },
}
