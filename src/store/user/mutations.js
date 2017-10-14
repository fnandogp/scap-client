export default {
  SET_USERS (state, users) {
    state.list = users
  },

  ADD_USER (state, user) {
    state.list.push(user)
  },

  REMOVE_USER (state, userId) {
    state.list = state.list.filter((user) => {
      return user.id !== userId
    })
  }
}
