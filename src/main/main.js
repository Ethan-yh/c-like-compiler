const { app, dialog, ipcMain, BrowserWindow, Notification } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile(path.join(__dirname, '..', 'static/index.html'))
}

app.whenReady().then(createWindow)

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
