import api from 'src/api'

export default {
  fetch ({commit}) {
    return api.user.index()
      .then((response) => {
        let users = response.data.data
        commit('SET_USERS', users)

        return Promise.resolve(users)
      })
  },

  create ({commit}, payload) {
    return api.user.create(payload)
    //  .then((response) => {
    //    let user = response.data
    //
    //    commit('ADD_USER', user)
    //  })
  },

  delete ({commit}, userId) {
    return api.user.delete(userId)
    //      .then((response) => {
    //        commit('REMOVE_USER', userId)
    //
    //        return Promise.resolve()
    //      })
  },

  assignDepartmentChief ({commit}, userId) {
    return api.user.assignDepartmentChief(userId)
    //      .then((response) => { })
  }
}
