import api from 'src/api'

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
    return api.removalRequest.create(payload)
  },

  chooseRapporteur ({commit}, payload) {
    return api.removalRequest.chooseRapporteur(payload)
  }
}
