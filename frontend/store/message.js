export const state = () => ({
  messages: [],
})

export const mutations = {
  loadMessages(state, payload) {
    state.messages = [...payload.messages]
  },
  addMessage(state, payload) {
    state.messages = [...state.messages, payload.message]
  },
}
