import type { Response } from '@/types'
import { instance } from './instance'

export function setRoomsRecordState(data: { uid: bigint[]; state: boolean }) {
  return instance.post<Response<any>>('set_rooms/modify_recording_settings', data)
}
export function addRoom(data: {
  uid?: bigint
  room_id?: number
  auto_rec: boolean
  remind: boolean
  rec_danmu: boolean
}) {
  return instance.post<Response<any>>('set_rooms/add_room', data)
}
