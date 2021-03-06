// 引入axios
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
// 配置axios的默认配置
//  - 创建一个全新的axios的对象, 克隆
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000,

  // 自定义后端返回的原始数据
  // data: 后端返回的原始数据，是 JSON 格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})
// 拦截器
//  - 请求拦截器
//    - 每一次请求都会执行的函数
//  - 响应拦截器
//    - 每一个请求响应回来时, 都会执行的函数

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const { token } = store.state.user

  // 请求发起会经过这里
  if (token) {
    // console.log(`Bearer ${token}`)
    config.headers.Authorization = `Bearer ${token}`
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么s
  return Promise.reject(error)
})
export default request
