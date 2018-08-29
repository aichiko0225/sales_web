import qs from 'qs'

export default {
  method: 'post',
  // 基础url前缀
  baseURL: 'http://localhost:5000',
  // 请求头信息
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json' | 'text',

  transformRequest: [function(data, headers) {
    // Do whatever you want to transform the data
    console.log(data)
    return qs.stringify(data)
  }]
}
