import { getDetailedRoomInfoList } from '@/api/get_room'
import { useLocalStorage } from '@vueuse/core'
import type { CompleteInfo } from '@/types/response'
import type { SearchType } from '@/enums/search_type'

const completeInfoList = ref<CompleteInfo[]>()
const total = ref(0)
const isLoading = ref(true)
const pageSize = useLocalStorage('pageSize', 12)
const currentPage = ref(1)
const currentFilterState = ref<SearchType>(0)
const searchWord = ref('')
const lastRefreshTime = ref(new Date().toLocaleTimeString())
let timer: ReturnType<typeof setInterval> | undefined = undefined

const getData = (page: number) => {
  isLoading.value = true
  getDetailedRoomInfoList({
    quantity: pageSize.value,
    page: page,
    type: currentFilterState.value,
    screen_name: searchWord.value
  }).then((res) => {
    console.log(res.data.data.completeInfoList[1])
    completeInfoList.value = res.data.data.completeInfoList
    total.value = res.data.data.total
    isLoading.value = false
  })
}

const useRoomInfoPageData = () => {
  onMounted(() => {
    if (timer === undefined) {
      timer = setInterval(() => {
        getDetailedRoomInfoList({
          quantity: pageSize.value,
          page: currentPage.value,
          type: currentFilterState.value,
          screen_name: searchWord.value
        }).then((res) => {
          lastRefreshTime.value = new Date().toLocaleTimeString()
          if (completeInfoList.value === res.data.data.completeInfoList) {
            return
          }
          completeInfoList.value = res.data.data.completeInfoList
          total.value = res.data.data.total
        })
      }, 5000)
      getData(1)
    }
  })
  return {
    completeInfoList,
    isLoading,
    total,
    pageSize,
    currentFilterState,
    currentPage,
    searchWord,
    lastRefreshTime,
    timer,
    getData
  }
}

export default useRoomInfoPageData
