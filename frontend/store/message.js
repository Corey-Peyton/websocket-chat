export const state = () => ({
  messages: [
    {
      sender: 'Sponge Bob',
      receiver: 'Reverse bot',
      content: 'Some message content',
      time: new Date(),
    },
    {
      sender: 'Reverse bot',
      receiver: 'Sponge Bob',
      content: 'Another content',
      time: new Date(),
    },
    {
      sender: 'Sponge Bob',
      receiver: 'Echo bot',
      content: 'Some message content',
      time: new Date(),
    },
    {
      sender: 'Ignore bot',
      receiver: 'Sponge Bob',
      content: 'Some message content',
      time: new Date(),
    },
    {
      sender: 'Sponge Bob',
      receiver: 'Spam bot',
      content: 'Another content',
      time: new Date(),
    },
  ],
})

export const mutations = {
  addMessage(state, payload) {
    state.messages = [...state.messages, payload.message]
  },
}

export const actions = {
  addMessage({ commit }, payload) {
    commit({
      type: 'addMessage',
      message: payload.message,
    })
  },
}
