import { LocalStorage } from 'quasar'

export default {
  login ({commit}, payload) {
    console.log('Payload:')
    console.log(payload)
    commit('set_token', payload.token)
    commit('set_user', payload.user)

    LocalStorage.set('token', payload.token)
  }
}
