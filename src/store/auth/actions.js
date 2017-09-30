import http from 'src/api'
import router from 'src/router'
import { LocalStorage } from 'quasar'

export default {
  checkToken ({commit}, payload) {
    let token = LocalStorage.get.item('token')

    if (!token) {
      console.log('not token')
      router.push({name: 'auth.login'})
    }

    // Set the authorization header
    http.defaults.headers.common['Authorization'] = `Bearer ${LocalStorage.get.item('token')}`

    http.get('/auth/me')
      .then((response) => {
        commit('SET_USER', response.data)

        return response
      })
      .catch((response) => {
        console.log('auth me catch')
        router.push({name: 'auth.login'})

        return response
      })
  },
  login ({commit}, payload) {
    commit('SET_TOKEN', payload.token)
    LocalStorage.set('token', payload.token)

    commit('SET_USER', payload.data)

    router.push({name: 'home'})
  },
  logout ({commit}, payload) {
    commit('UNSET_TOKEN')
    LocalStorage.remove('token')

    commit('UNSET_USER')

    router.push({name: 'auth.login'})
  }
}
