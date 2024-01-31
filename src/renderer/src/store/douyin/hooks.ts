import { useSnapshot } from 'valtio'
import { douyinStore } from './store'

export function useDouyin() {
  const store = useSnapshot(douyinStore)

  return {
    dyhCount: store.dyhCount,
    dfzxCount: store.dfzxCount,
    countdown: store.countdown
  }
}
