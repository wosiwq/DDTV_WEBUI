export interface Response<T> {
  code: number
  cmd: string
  massage: string
  data: T
}

export interface completeRoomInfoData {
  total: number
  completeInfoList: CompleteInfoListItem[]
}

export interface CompleteInfoListItem {
  userInfo: UserInfo
  roomInfo: RoomInfo
  taskStatus: TaskStatus
}

export interface UserInfo {
  name: string
  description: string
  uid: number
  isAutoRec: boolean
  isRemind: boolean
  isRecDanmu: boolean
  sex: string
  sign: string
}

export interface RoomInfo {
  roomId: number
  title: string
  attention: number
  liveTime: number
  liveStatus: boolean
  shortId: number
  areaName: string
  face: string
  tags: string
  coverFromUser: string
  keyFrame: string
  url: string
}

export interface TaskStatus {
  isDownload: boolean
  downloadSize: number
  status: number
  startTime: string
  endTime: string
  title: string
}
