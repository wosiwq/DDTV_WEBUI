import type { Response } from '@/types'
import type { fileTreeNode } from '@/types/response'
import { instance } from './instance'

export function getFileTree() {
  return instance.post<Response<fileTreeNode>>('file/get_file_structure')
}
