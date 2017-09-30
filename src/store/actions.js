export default {
  // Clear the alerts of a specific type
  clearAlert ({commit}, payload) {
    payload.alerts = []
    commit('SET_ALERT', payload)
  },
  // Clear alerts of every type
  clearAlerts ({dispatch}) {
    dispatch('clearAlert', {type: 'success'})
    dispatch('clearAlert', {type: 'info'})
    dispatch('clearAlert', {type: 'warning'})
    dispatch('clearAlert', {type: 'error'})
  }
}
