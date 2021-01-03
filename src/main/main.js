const { app, dialog, ipcMain, BrowserWindow, Menu, Notification } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
    const win = new BrowserWindow({
        width: 1250,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile(path.join(__dirname, '..', 'static/dist/index.html'))
}

let template = [{
    label: '视图',
    submenu: [{
        label: '重新加载界面',
        accelerator: 'CmdOrCtrl+R',
        click: (item, focusedWindow) => {
            if (focusedWindow) {
                // on reload, start fresh and close any old
                // open secondary windows
                if (focusedWindow.id === 1) {
                    BrowserWindow.getAllWindows().forEach(win => {
                        if (win.id > 1) win.close()
                    })
                }
                focusedWindow.reload()
            }
        }
    }, {
        label: '全屏',
        accelerator: (() => {
            if (process.platform === 'darwin') {
                return 'Ctrl+Command+F'
            } else {
                return 'F11'
            }
        })(),
        click: (item, focusedWindow) => {
            if (focusedWindow) {
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
        }
    }, {
        label: 'Toggle Developer Tools',
        visible: false,
        accelerator: (() => {
            if (process.platform === 'darwin') {
                return 'Alt+Command+I'
            } else {
                return 'Ctrl+Shift+I'
            }
        })(),
        click: (item, focusedWindow) => {
            if (focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        }
    }]
}, {
    label: '窗口',
    role: 'window',
    submenu: [{
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }, {
        type: 'separator'
    }]
}]

app.whenReady().then(()=>{
    createWindow()
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('读文件', (event, arg) => {
    let filePath = dialog.showOpenDialogSync({ properties: ['openFile'] })
    let code = fs.readFileSync(filePath[0]);
    event.returnValue = code.toString()
  })

// const root = fs.readdirSync('/')
