// 导入axios
import type { Response } from '@/types'
import type { completeRoomInfoData } from '@/types/response'
import axios from 'axios'
import SHA1 from 'crypto-js/sha1'

// 定义封装的axios实例
const instance = axios.create({
  timeout: 10000
})

// 定义请求拦截器
instance.interceptors.request.use(
  (config) => {
    const isGetMethod = config.method === 'get'
    const isPostMethod = config.method === 'post'

    let params = isGetMethod ? config.params : config.data

    const accessKeyid = localStorage.getItem('AccessKeyId')
    const accessKeySecret = localStorage.getItem('AccessKeySecret')

    if (config.url) {
      config.url = config.url.includes('api/') ? config.url : `api/${config.url}`

      params = {
        ...params,
        access_key_id: accessKeyid,
        time: Math.floor(Date.now() / 1000)
      }
      const origin_params = { ...params }
      origin_params['access_key_secret'] = accessKeySecret
      const sortedParams = Object.keys(origin_params)
        .sort()
        .map((key) => `${key.toLowerCase()}=${origin_params[key]}`)
        .join(';')

      params['sig'] = SHA1(sortedParams).toString()

      if (isGetMethod) {
        config.params = params
      } else if (isPostMethod) {
        const formData = new FormData()
        Object.keys(params).forEach((key) => formData.append(key, params[key]))
        config.data = formData
      }
    }

    return config
  },
  (error) => {
    // 返回错误信息
    return Promise.reject(error)
  }
)

// 定义响应拦截器
instance.interceptors.response.use(
  (response) => {
    // if (
    //   response.data.code === Code.LoginInfoFailure ||
    //   response.data.code === Code.LoginVerificationFailed
    // ) {
    //   router.push('/login')
    // }

    return response
  },
  (error) => {
    // 返回错误信息
    return Promise.reject(error)
  }
)

export function getDokidoki() {
  return instance.get<Response<any>>('dokidoki', {})
}

export function postDokidoki() {
  return instance.post<Response<any>>('dokidoki')
}

export function getDetailedRoomInfo(data: { quantity: number; page: number }) {
  return instance.post<Response<completeRoomInfoData>>(
    'get_rooms/all_complete_room_information',
    data
  )
}
export function getBasicRoomInfo(data: { quantity: number; page: number }) {
  return instance.post<Response<any>>('get_rooms/all_basic_room_information', data)
}
