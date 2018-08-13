import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/account/login'
import error from '../pages/error'
import cookie from '../utils/cookie.js'
import Layout from '../pages/layout/Layout'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/error/:status',
      name: 'error',
      component: error
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    let user_id = cookie.getCookie('user_id')
    console.log(user_id)
    let userId = cookie.getCookie('user_id')
    console.log('userId ====', userId)
    if (userId.length === 0) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
