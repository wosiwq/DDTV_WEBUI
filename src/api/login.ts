import type { Response } from '@/types'
import { instance } from './instance'

export function getLoginQrcode() {
  return instance.post<Blob>('login/get_login_qr', null, {
    responseType: 'blob'
  })
}
export function getUserAgreement() {
  return instance.post<Response<any>>('login/use_agree')
}
export function doReLogin() {
  return instance.post<Response<any>>('login/re_login')
}
