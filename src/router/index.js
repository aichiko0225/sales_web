import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/account/login'
import error from '../pages/error'
import cookie from '../utils/cookie.js'
import Layout from '../pages/layout/Layout'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // 滚动位置
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/dashboard',
      children: [{
        path: '/dashboard',
        component: () => import('@/pages/dashboard/index'),
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, requireAuth: true }
      }],
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
