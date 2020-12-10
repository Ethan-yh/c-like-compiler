
const { ipcRenderer } = require('electron')

function readFile() {
  return ipcRenderer.sendSync('读文件', '')
}