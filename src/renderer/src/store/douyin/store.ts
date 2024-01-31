import { proxy } from 'valtio'

class DouyinStore {
  dyhCount: number = 0
  dfzxCount: number = 0
  countdown: number = 0
}

export const douyinStore = proxy(new DouyinStore())

window.api.onDouyin((info) => {
  Object.assign(douyinStore, info)
})
