import type { Response } from '@/types'
import { instance } from './instance'

export function getLoginStatus() {
  return instance.post<Response<any>>('login/get_login_status')
}
export function getLoginQrcode() {
  return instance.get<Blob>('login/get_login_qr', {
    responseType: 'blob'
  })
}
export function getUserAgreement() {
  return instance.post<Response<any>>('login/use_agree')
}
export function doReLogin() {
  return instance.post<Response<any>>('login/re_login')
}
