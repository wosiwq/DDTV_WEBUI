import type { Response } from '@/types'
import { instance } from './instance'

export function getLoginQrcode() {
  return instance.post<Response<any>>('login/get_login_qr')
}
