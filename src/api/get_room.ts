import type { Response } from '@/types'
import type { completeRoomInfoData } from '@/types/response'
import { instance } from './instance'

export function getDetailedRoomInfo(data: { quantity: number; page: number }) {
  return instance.post<Response<completeRoomInfoData>>(
    'get_rooms/all_complete_room_information',
    data
  )
}
export function getBasicRoomInfo(data: { quantity: number; page: number }) {
  return instance.post<Response<any>>('get_rooms/all_basic_room_information', data)
}
