import type { Response, Combine, AtLeastOne } from '@/types'
import { instance } from './instance'

export function addRoom(
  data: Combine<
    { uid: bigint; room_id: number },
    { auto_rec: boolean; remind: boolean; rec_danmu: boolean }
  >
) {
  return instance.post<Response<any>>('set_rooms/add_room', data)
}

export function delRoom(data: AtLeastOne<{ uid: bigint; room_id: number }>) {
  return instance.post<Response<any>>('set_rooms/del_room', data)
}

export function setRoomsRecordState(data: { uid: bigint[]; state: boolean }) {
  return instance.post<Response<any>>('set_rooms/modify_recording_settings', data)
}

export function setRoomsDMState(data: { uid: bigint[]; state: boolean }) {
  return instance.post<Response<any>>('set_rooms/modify_room_dm_settings', data)
}

export function setRoomsPromptState(data: { uid: bigint[]; state: boolean }) {
  return instance.post<Response<any>>('set_rooms/modify_room_prompt_settings', data)
}
