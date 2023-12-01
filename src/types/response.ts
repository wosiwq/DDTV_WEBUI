import type { AxiosResponse } from 'axios'
export interface Memory {
  Total: number
  Available: number
}

export interface HDDInfo {
  FileSystem: string
  Size: string
  Used: string
  Avail: string
  Usage: string
  MountPath: string
}

export interface SystemResourcesData {
  Platform: string
  CPU_usage: number
  Memory: Memory
  HDDInfo: HDDInfo[]
}

export interface Response<T> extends AxiosResponse {
  data: {
    code: number
    cmd: string
    massage: string
    data: T
  }
}
