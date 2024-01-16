import type { Response } from '@/types'
import type { CompleteRoomInfoData } from '@/types/response'
import { instance } from './instance'

export function getDetailedRoomInfoList(data: { quantity: number; page: number; type?: number }) {
  return instance.post<Response<CompleteRoomInfoData>>(
    'get_rooms/batch_complete_room_information',
    data
  )
}
export function getBasicRoomInfoList(data: { quantity: number; page: number; type?: number }) {
  return instance.post<Response<any>>('get_rooms/batch_basic_room_information', data)
}
export function getRoomHeartbeat(data: { quantity: number; page: number; type?: number }) {
  return instance.post<Response<any>>('get_rooms/room_information', data)
}
