import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'src/store'
import { Loading } from 'quasar'

Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
 */
function load (component) {
  // '@' is aliased to src/components
  return () => import(`src/views/${component}.vue`)
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
      component: load('auth/Auth'),
      children: [
        {
          path: 'login',
          name: 'auth.login',
          component: load('auth/Login'),
          meta: {requiresGuest: true}
        },
        {
          path: 'password',
          name: 'auth.password-recovery-request',
          component: load('auth/PasswordRecoveryRequest'),
          meta: {requiresGuest: true}
        },
        {
          path: 'password-change',
          name: 'auth.password-recovery-change',
          component: load('auth/PasswordRecoveryChange'),
          meta: {requiresGuest: true}
        }
      ]
    },
    {
      path: '/',
      component: load('admin/Master'),
      meta: {requiresAuth: true},
      children: [
        {
          path: '/',
          name: 'home',
          component: load('admin/Home'),
          meta: {requiresAuth: true}
        },
        // Users
        {
          path: '/users',
          name: 'user.index',
          components: {
            default: load('admin/users/UserIndex'),
            'floatingActions': load('admin/users/UserIndexFloatingActions')
          },
          meta: {requiresAuth: true}
        },
        {
          path: '/users/create',
          name: 'user.create',
          component: load('admin/users/UserCreate'),
          meta: {requiresAuth: true}
        },
        {
          path: '/users/:userId/edit',
          name: 'user.edit',
          component: load('admin/users/UserEdit'),
          meta: {requiresAuth: true}
        },
        // Removal requests
        {
          path: '/removal-requests',
          name: 'removal-request.index',
          components: {
            default: load('admin/removal-request/RemovalRequestIndex'),
            'floatingActions': load('admin/removal-request/RemovalRequestIndexFloatingActions')
          },
          meta: {requiresAuth: true}
        },
        {
          path: '/removal-requests/create',
          name: 'removal-request.create',
          component: load('admin/removal-request/RemovalRequestCreate'),
          meta: {requiresAuth: true}
        }
      ]
    },
    {
      path: '*',
      name: 'not-found',
      component: load('NotFound')
    }
  ]
})

router.beforeEach((to, from, next) => {
  Loading.show()

  store.dispatch('clearAlerts')

  let requiresAuth = to.meta.requiresAuth

  if (!requiresAuth) {
    next()
    return
  }

  store.dispatch('auth/checkToken')
    .then(() => {
      // There is a token and it is valid
      next() // can access the route
    })
    .catch(() => {
      // No token, or it is invalid
      next({name: 'auth.login'}) // redirect to login
    })

  next()
})

router.afterEach((to, from, next) => {
  Loading.hide()
})

export default router
