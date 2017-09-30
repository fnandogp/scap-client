export default {
  SET_TITLE (state, payload) {
    state.title = payload
  },
  SET_ALERT (state, payload) {
    state.alerts[payload.type] = payload.alerts
  }
}
