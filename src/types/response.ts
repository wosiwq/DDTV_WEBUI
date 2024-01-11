export interface Response<T> {
  code: number
  massage: string
  data: T
}

export interface UserInfo {
  Name: string
  Description: string
  UID: number
  IsAutoRec: boolean
  IsRemind: boolean
  IsRecDanmu: boolean
  Sex: string
  Sign: string
}

export interface RoomInfo {
  RoomId: number
  Title: string
  Attention: number
  LiveTime: number
  LiveStatus: boolean
  ShortId: number
  AreaName: string
  Face: string
  tags: string // Note: field names in TypeScript are case-sensitive
  CoverFromUser: string
  KeyFrame: string
  Url: string
}

export interface TaskStatus {
  IsDownload: boolean
  DownloadSize: number
  Status: number
  StartTime: string
  EndTime: string
  Title: string
}

export interface BasicInfoListItem {
  userInfo: UserInfo
  roomInfo: RoomInfo
  taskStatus: TaskStatus
}

export interface detailedRoomInfoData {
  Total: number
  basicInfolist: BasicInfoListItem[]
}
