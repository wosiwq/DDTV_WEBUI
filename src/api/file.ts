import type { Response } from '@/types'
import { instance } from './instance'

export function getFileTree() {
  return instance.post<Response<any>>('file/get_file_structure')
}
