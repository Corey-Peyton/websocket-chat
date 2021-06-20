export const state = () => ({
  interlocutors: [
    {
      username: 'Reverse bot',
      avatar: 'reversebot.png',
      isOnline: true,
    },
    {
      username: 'Echo bot',
      avatar: 'echobot.png',
      isOnline: true,
    },
    {
      username: 'Spam bot',
      avatar: 'spambot.png',
      isOnline: true,
    },
    {
      username: 'Ignore bot',
      avatar: 'ignorebot.png',
      isOnline: true,
    },
  ],
  currentInterlocutorUsername: null,
})

export const mutations = {
  setCurrentInterlocutorUsername(state, payload) {
    state.currentInterlocutorUsername = payload.username
  },
}
