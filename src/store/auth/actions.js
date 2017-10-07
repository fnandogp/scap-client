import http from 'src/http'
import api from 'src/api'
import { LocalStorage } from 'quasar'

export default {
  checkToken ({dispatch, state}, payload) {
    let token = state.token

    if (token) {
      return Promise.resolve(token)
    }

    token = LocalStorage.get.item('token')

    if (!token) {
      return Promise.reject(new Error('NO_TOKEN'))
    }

    return dispatch('setToken', token)
      .then(() => {
        return dispatch('loadUser').catch(() => {
          console.log('catch set token')
        })
      })
  },

  attemptLogin ({dispatch}, payload) {
    api.auth.attemptLogin(payload)
      .then((response) => {
        let token = response.data.token
        let user = response.data.data

        dispatch('setToken', token)

        dispatch('setUser', token)

        return user
      })
  },

  logout ({dispatch}) {
    api.auth.logout()

    return Promise.all([
      dispatch('setToken', null),
      dispatch('setUser', {})
    ])
  },

  loadUser ({dispatch}) {
    api.auth.me()
      .then((response) => {
        let user = response.data.data

        return dispatch('setUser', user)
      })
      .catch(() => {
        // Process failure, delete the token
        dispatch('setToken', '')
        return Promise.reject(new Error('FAIL_IN_LOAD_USER'))
      })
  },

  setToken ({commit}, token) {
    commit('SET_TOKEN', token)

    LocalStorage.set('token', token)
    if (!token) {
      LocalStorage.remove('token')
    }

    http.defaults.headers.common['Authorization'] = `Bearer ${token}`

    return Promise.resolve(token)
  },

  setUser ({commit}, user) {
    commit('SET_USER', user)

    return Promise.resolve(user)
  }
}
