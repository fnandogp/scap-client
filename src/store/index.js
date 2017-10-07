import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'

import auth from './auth'
import user from './user'
import removalRequest from './removalRequest'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    auth,
    user,
    removalRequest
  }
})
