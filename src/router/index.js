import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/account/login'
import error from '../pages/error'
import cookie from '../utils/cookie.js'
import Layout from '../pages/layout/Layout'
// import store from '@/store'

Vue.use(Router)


export const constantRouterMap = [
  {
    path: '',
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
    component: error,
    hidden: true
  }
]


export const asyncRouterMap = [
  {
    path: '/customer',
    component: Layout,
    name: 'customer',
    redirect: 'noredirect',
    meta: {
      title: 'customer',
      icon: 'peoples',
      requireAuth: true
    },
    children: [
      {
        path: 'manager',
        // 管理客户
        name: 'managerCustomer',
        component: () => import('@/pages/customer/manager'),
        meta: { title: 'managerCustomer', requireAuth: true }
      },
      {
        path: 'add',
        // 管理客户
        name: 'addCustomer',
        component: () => import('@/pages/dashboard/index'),
        meta: { title: 'addCustomer', requireAuth: true }
      }
    ]
  },
  {
    path: '/orders',
    name: 'orders',
    component: Layout,
    meta: {
      title: 'orders',
      icon: 'orders',
      requireAuth: true
    },
    redirect: 'noredirect',
    children: [
      {
        path: 'query',
        // 查询订单
        name: 'queryOrders',
        component: () => import('@/pages/orders/queryOrders'),
        meta: { title: 'queryOrders', requireAuth: true }
      },
      {
        path: 'placeOrder',
        // 查询订单
        name: 'placeOrder',
        component: () => import('@/pages/customer/manager'),
        meta: { title: 'placeOrder', requireAuth: true }
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  // 滚动位置
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(asyncRouterMap)
})

router.beforeEach((to, from, next) => {
  let userId = cookie.getCookie('user_id')
  if (userId.length > 0) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // store.dispatch('generateRoutes', {}).then(() => {
      //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      // })
      next()
    }
  } else {
    if (to.meta.requireAuth) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})

export default router

// router.addRoutes(asyncRouterMap) // 动态添加可访问路由表
