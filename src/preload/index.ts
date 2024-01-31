import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { polling } from './utils/polling'

// Custom APIs for renderer
const api = {
  onDouyin: (callback: (message: Douyin) => void) =>
    ipcRenderer.on('douyin', (_, message) => callback(message))
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hostname.includes('douyin')) {
    void polling((data) => {
      void ipcRenderer.invoke('douyin', data)
    })
  }
})
