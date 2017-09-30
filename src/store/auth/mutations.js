export default {
  SET_TOKEN (state, payload) {
    state.token = payload
  },
  UNSET_TOKEN (state) {
    state.token = ''
  },
  SET_USER (state, payload) {
    state.user = payload
  },
  UNSET_USER (state) {
    state.user = {}
  }
}
