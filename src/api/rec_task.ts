import type { Response } from '@/types'
import { instance } from './instance'

export function cancelTask() {
  return instance.get<Response<any>>('rec_task/cancel_task')
}

export function createTask() {
  return instance.post<Response<any>>('rec_task/single_record')
}
