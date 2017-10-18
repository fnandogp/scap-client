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

  updateList ({commit}, payload) {
    commit('UPDATE_LIST_ITEM', payload)
  },

  create ({dispatch}, payload) {
    return api.removalRequest.create(payload)
  },

  chooseRapporteur ({dispatch}, payload) {
    return api.removalRequest.chooseRapporteur(payload)
      .then((response) => {
        dispatch('updateList', response.data.data.removal_request.data)
      })
  },

  deferOpinion ({dispatch}, payload) {
    return api.removalRequest.deferOpinion(payload)
      .then((response) => {
        console.log(response)
        dispatch('updateList', response.data.data.removal_request.data)
      })
  },

  registerCtOpinion ({dispatch}, payload) {
    return api.removalRequest.registerCtOpinion(payload)
      .then((response) => {
        console.log(response)
        dispatch('updateList', response.data.data.removal_request.data)
      })
  },

  registerPrppgOpinion ({dispatch}, payload) {
    return api.removalRequest.registerPrppgOpinion(payload)
      .then((response) => {
        console.log(response)
        dispatch('updateList', response.data.data.removal_request.data)
      })
  },

  manifestAgainst ({dispatch}, payload) {
    return api.removalRequest.registerPrppgOpinion(payload)
      .then((response) => {
        dispatch('updateList', response.data.data.removal_request.data)
      })
  }
}
