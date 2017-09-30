import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'src/store'
// import http from 'src/api'
import { Loading } from 'quasar'

Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
 */
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

let router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  mode: 'history',

  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: load('views/auth/Auth'),
      children: [
        {
          path: 'login',
          name: 'auth.login',
          component: load('views/auth/Login')
        },
        {
          path: 'password',
          name: 'auth.password-recovery-request',
          component: load('views/auth/PasswordRecoveryRequest')
        },
        {
          path: 'password-change',
          name: 'auth.password-recovery-change',
          component: load('views/auth/PasswordRecoveryChange')
        }
      ]
    },
    {
      path: '/',
      name: 'admin',
      component: load('views/admin/Admin'),
      meta: {requiresAuth: true},
      children: [
        {
          path: '/',
          name: 'home',
          component: load('views/admin/Home'),
          meta: {requiresAuth: true}
        }
      ]
    },
    {
      path: '*',
      name: 'not-found',
      component: load('views/NotFound')
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('clearAlerts')

  let auth = to.meta.requiresAuth
  let token = store.state.token

  if (auth && !token) {
    next('/auth/login')
  }

  Loading.show()
  next()
})

router.afterEach((to, from, next) => {
  Loading.hide()
})

export default router
