import axios from 'axios'
import config from './config.js'
import { Message } from 'element-ui'
import router from '../router'

const instance = axios.create(config)

// POST传参序列化(添加请求拦截器)
instance.interceptors.request.use(
  config => {
    console.log(config)
    return config
  },
  error => {
    Message({
      type: 'error',
      message: error.data.error.message
    })
    return Promise.reject(error)
  }
)

// 返回状态判断(添加响应拦截器)
instance.interceptors.response.use(
  response => {
    console.log(response)
    if (response.data.code === 0) {
    } else {
      let errorInfo = response.data.message ? response.data.message : '未知错误'
      Message({
        message: errorInfo,
        type: 'error',
        center: true
      })
      return Promise.reject(errorInfo)
    }
    return response
  },
  error => {
    // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
    if (error.response) {
      if (error.response.status === 403) {
        router.push({
          path: '/error/403'
        })
      }
      if (error.response.status === 500) {
        router.push({
          path: '/error/500'
        })
      }
      if (error.response.status === 502) {
        router.push({
          path: '/error/502'
        })
      }
      if (error.response.status === 404) {
        router.push({
          path: '/error/404'
        })
      }
    }
    return Promise.reject(error)
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, '$http', { value: instance })
  }
}
