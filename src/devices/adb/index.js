import { spawn, exec } from 'child_process'
import { get_adb_device_list, closeAllRunningApps } from './devices'
import {
    io_react,
} from '../../sockets'
import {
    readyFileSaveDir,
} from '..'
var r = require('rethinkdb')
var path = require('path')
var fs = require('fs')

get_adb_device_list()
.then(deviceList => {
    deviceList.forEach((device) => {
        closeAllRunningApps(device)
        .then(() => {
            console.log('apps closed on ' + device)
            startCameraApp(device)
            .then(() => console.log('podware camera opening on ' + device))
        })
    })
})

export const queryADBDevices = () => {
    get_adb_device_list()
    .then(deviceList => io_react.sockets.emit('logADBDevices', deviceList))
}

const startCameraApp = (device) => {
    return new Promise((resolve,reject) => {
        exec('adb -s ' + device + ' shell am start -n com.podware_camera/com.podware_camera.MainActivity',(err,stdout,stdin) => {
            if(err) {
                console.log('ERROR opening app on device ' + device)
                console.log(err)
            }
            resolve()
        })
    })
}

export const pullVideoFile = (data) => {
    const device = data.device
    const pullFilePath = data.pullFilePath
    const timestamp = data.timestamp
    const endTime = data.endTime
    const videoFileName = path.basename(pullFilePath)
    const mediaDir = global.podware.currentRecordingSession.mediaDir
    const outFile = mediaDir + videoFileName
        spawn('adb',['-s',device,'pull',pullFilePath,outFile]).stdout.on('data',data => {
            /*
            if(fs.existsSync(outFile)) {
                console.log(videoFileName + ' exists locally -> now deleting from ' + device)
                exec('adb -s ' + device + ' shell rm -rf ' + pullFilePath, (err,stdout,stdin) => {
                    if(err) console.log(err)
                })
            }
            */
    })
}
