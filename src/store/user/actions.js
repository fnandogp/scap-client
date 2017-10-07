import api from 'src/api'

export default {
  fetch ({commit}) {
    return api.user.index()
      .then((response) => {
        let users = response.data.data
        commit('SET_USERS', users)

        return Promise.resolve(users)
      })
  }
}
