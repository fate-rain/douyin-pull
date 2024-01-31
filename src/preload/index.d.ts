import { ElectronAPI } from '@electron-toolkit/preload'
import BulletChat from "../renderer/src/components/BulletChat";

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      onDouyin(callback: (message: Douyin) => void): void
    }
  }
}
