import { app, BrowserWindow } from 'electron'
import './cli'

// Let electron reloads by itself when webpack watches changes in ./src/
require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow()
    mainWindow.maximize()
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    mainWindow.webContents.openDevTools()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
