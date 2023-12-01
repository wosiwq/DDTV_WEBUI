// 导入axios
import axios from 'axios'

// 定义封装的axios实例
const instance = axios.create({
  timeout: 10000
})

// 定义请求拦截器
instance.interceptors.request.use(
  (config) => {
    const isGetMethod = config.method === 'get'
    const isPostMethod = config.method === 'post'

    let params = isGetMethod ? config.params : config.data

    if (config.url) {
      const cmd = config.url.replace('api/', '')
      config.url = config.url.includes('api/') ? config.url : `api/${config.url}`

      params = { ...params, CMD: cmd }

      if (isGetMethod) {
        config.params = params
      } else if (isPostMethod) {
        const formData = new FormData()
        Object.keys(params).forEach((key) => formData.append(key, params[key]))
        config.data = formData
      }
    }

    return config
  },
  (error) => {
    // 返回错误信息
    return Promise.reject(error)
  }
)

// 定义响应拦截器
instance.interceptors.response.use(
  (response) => {
    // if (
    //   response.data.code === Code.LoginInfoFailure ||
    //   response.data.code === Code.LoginVerificationFailed
    // ) {
    //   router.push('/login')
    // }

    return response
  },
  (error) => {
    // 返回错误信息
    return Promise.reject(error)
  }
)

// 定义接口调用的函数
// 获取系统运行情况
export function getSystemInfo() {
  return instance.post('System_Info')
}

// 获取系统配置文件信息
export function getSystemConfig() {
  return instance.post('System_Config')
}

// 获取系统硬件资源使用情况
export function getSystemResources() {
  return instance.post('System_Resources')
}

// 获取历史日志
export function getSystemLog() {
  return instance.post('System_Log')
}

// 获取最新日志
export function getSystemLatestLog() {
  return instance.post('System_LatestLog')
}

// 返回一个可以自行设定的初始化状态值
export function getSystemQueryWebFirstStart() {
  return instance.post('System_QueryWebFirstStart')
}

// 设置初始化状态值
export function setSystemSetWebFirstStart() {
  return instance.post('System_SetWebFirstStart')
}

// 查询阿B接口返回数据判断用户登陆状态是否有效
export function getBiliAccountState() {
  return instance.post('System_QueryUserState')
}

// 设置自动转码总开关
export function setConfigTranscod(data: { state: boolean }) {
  return instance.post('Config_Transcod', data)
}

// 根据文件大小自动切片
export function setConfigFileSplit(data: { Size: number }) {
  return instance.post('Config_FileSplit', data)
}

// 弹幕录制总共开关(包括礼物、舰队、SC)
export function setConfigDanmuRec(data: { danmuRec: boolean }) {
  return instance.post('Config_DanmuRec', data)
}

// 导入关注列表中的V
export function getConfigGetFollow() {
  return instance.post('Config_GetFollow')
}

// 获取已录制的文件列表
export function getFileGetAllFileList() {
  return instance.post('File_GetAllFileList')
}

// 下载对应的文件
export function getFileGetFile(data: { fileName: string }) {
  return instance.get('File_GetFile', { params: data })
}

// 根据文件树结构返回已录制的文件总列表
export function getFileGetFilePathList() {
  return instance.post('File_GetFilePathList')
}

// 分类获取已录制的文件总列表
export function getFileGetTypeFileList() {
  return instance.post('File_GetTypeFileList')
}

// WEB登陆
export function webUILogin(data: { username: string; password: string }) {
  return instance.post('Login', data)
}

// 在提示登陆的情况下获取用于的登陆二维码
export function getBiliLoginQr() {
  return instance.get('loginqr', { responseType: 'blob' })
}

// 重新登陆哔哩哔哩账号
export function biliLoginReset() {
  return instance.post('Login_Reset')
}

// 查询内部登陆状态
export function getBiliAccountLoginState() {
  return instance.post('Login_State')
}

// 获取下载中的任务情况详细情况
export function getRecRecordingInfo() {
  return instance.post('Rec_RecordingInfo')
}

// 获取下载中的任务情况简略情况
export function getRecRecordingInfoLite() {
  return instance.post('Rec_RecordingInfo_Lite')
}

// 获取已经完成的任务详细情况
export function getRecRecordCompleteInfon() {
  return instance.post('Rec_RecordCompleteInfon')
}

// 获取已经完成的任务简略情况
export function getRecRecordCompleteInfonLite() {
  return instance.post('Rec_RecordCompleteInfon_Lite')
}

// 取消某个下载任务
export function recCancelDownload(data: { roomId: number }) {
  return instance.post('Rec_CancelDownload', data)
}

// 获取房间详细配置信息
export function getRoomAllInfo() {
  return instance.post('Room_AllInfo')
}

// 获取房间简要配置信息
export function getRoomSummaryInfo() {
  return instance.post('Room_SummaryInfo')
}

// 增一个加房间配置
export function roomAdd(data: { roomId: number }) {
  return instance.post('Room_Add', data)
}

// 删除一个房间配置
export function roomDel(data: { roomId: number }) {
  return instance.post('Room_Del', data)
}

// 修改房间自动录制配置信息
export function roomAutoRec(data: { roomId: number; autoRec: boolean }) {
  return instance.post('Room_AutoRec', data)
}

// 修改房间弹幕录制配置信息
export function roomDanmuRec(data: { roomId: number; danmuRec: boolean }) {
  return instance.post('Room_DanmuRec', data)
}

// 通过阿B搜索搜索直播用户
export function userSearch(data: { keyword: string }) {
  return instance.post('User_Search', data)
}
