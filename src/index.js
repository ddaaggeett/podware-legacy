import {
    bundleFile,
} from '../config'
import { app, BrowserWindow } from 'electron'
import { initData } from './state'
import './adb'
import './video'
var fs = require('fs')

initData()

// Let electron reloads by itself when webpack watches changes in ./src/
require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow

const bundleReady = () => {
    return new Promise((resolve,reject) => {
        var flag = true
        while (flag) {
            if(fs.existsSync(bundleFile)) {
                console.log('exists')
                flag = false
                resolve()
            }
        }
    })
}

bundleReady()
.then(() => {
    app.on('ready', () => {
        mainWindow = new BrowserWindow()
        // mainWindow.maximize()
        mainWindow.loadURL(`file://${__dirname}/index.html`)
        // mainWindow.webContents.openDevTools()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
