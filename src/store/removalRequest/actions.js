import api from 'src/api'
import { date } from 'quasar'

export default {
  fetch ({commit}) {
    return api.removalRequest.index()
      .then((response) => {
        let removalRequests = response.data.data
        commit('SET_REMOVAL_REQUESTS', removalRequests)

        return Promise.resolve(removalRequests)
      })
  },

  fetchMine ({commit}) {
    return api.removalRequest.indexMine()
      .then((response) => {
        let removalRequests = response.data.data
        commit('SET_REMOVAL_REQUESTS', removalRequests)

        return Promise.resolve(removalRequests)
      })
  },

  create ({commit}, payload) {
    payload.removal_from = date.formatDate(payload.removal_from, 'YYYY-MM-DD')
    payload.removal_to = date.formatDate(payload.removal_to, 'YYYY-MM-DD')
    payload.event_from = date.formatDate(payload.event_from, 'YYYY-MM-DD')
    payload.event_to = date.formatDate(payload.event_to, 'YYYY-MM-DD')

    return api.removalRequest.create(payload)
  }
}
