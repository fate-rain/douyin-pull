import { join } from 'path'

import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import icon from '../../resources/app.png?asset'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 457,
    height: 812,
    x: 200,
    y: 50,
    show: false,
    autoHideMenuBar: true,
    // 无边框
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}) ,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    resizable: false
  })

  // 当页面置于后台时，此 WebContents 是否会限制动画和计时器
  // https://www.electronjs.org/zh/docs/latest/api/web-contents#contentssetbackgroundthrottlingallowed
  mainWindow.webContents.setBackgroundThrottling(false)

  const { x, y } = mainWindow.getBounds()

  const douyinWindow = new BrowserWindow({
    parent: mainWindow,
    width: 500,
    height: 500,
    x: x + 457 + 20,
    y,
    show: false,
    autoHideMenuBar: true,
    // 无边框
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  douyinWindow.webContents.setBackgroundThrottling(false)

  mainWindow.on('ready-to-show', async () => {
    mainWindow.show()
  })

  douyinWindow.on('ready-to-show', async () => {
    douyinWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    douyinWindow.loadURL(
      'https://www.douyin.com/user/MS4wLjABAAAAInYK7Wk_cCLwFlhAvpgeYFSXDQwUWmemBCsyCYtKOOI'
    )
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    douyinWindow.loadURL(
      'https://www.douyin.com/user/MS4wLjABAAAAInYK7Wk_cCLwFlhAvpgeYFSXDQwUWmemBCsyCYtKOOI'
    )
  }

  return {
    mainWindow
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const { mainWindow } = createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // 抖音
  ipcMain.handle('douyin', (_, info: Douyin) => {
    mainWindow.webContents.send('douyin', info)
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
