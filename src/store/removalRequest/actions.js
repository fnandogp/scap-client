import api from 'src/api'

export default {
  fetch ({commit}) {
    console.log('fetchRemovalRequests')

    return api.removalRequest.index()
      .then((response) => {
        let removalRequests = response.data.data
        commit('SET_REMOVAL_REQUESTS', removalRequests)

        return Promise.resolve(removalRequests)
      })
  }
}
