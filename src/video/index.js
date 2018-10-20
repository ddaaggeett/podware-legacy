import {
    exec,
    spawn,
} from 'child_process'
import {
    recordingsDir,
} from '../../config'
import {
    socketPort,
    socketPort_local,
} from '../../config'
var io_remote = require('socket.io').listen(socketPort)
var io_local = require('socket.io').listen(socketPort_local)
var fs = require('fs')

var videoStart
var videoStop

io_remote.on('connect', (socket) => {
    console.log('connected to camera')

    socket.on('videoReadyToPull', (pullFilePath) => { // TODO: for specific adb devices
        const videoFileName = require('path').basename(pullFilePath)
        spawn('adb',['pull',pullFilePath,recordingsDir]).stdout.on('data',data => {
            if(fs.existsSync(recordingsDir + videoFileName)) {
                console.log('exists -> now deleting from device')
                exec('adb shell rm -rf ' + pullFilePath, (err,stdout,stdin) => {
                    if(err) console.log(err)
                })
            }
        })
    })

    videoStart = () => {
        socket.emit('startRecording')
    }

    videoStop = () => {
        socket.emit('stopRecording')
    }
})

io_local.on('connect', (socket) => {
    console.log('connected to self')

    socket.on('triggerStartVideo', videoStart)
    socket.on('triggerStopVideo', videoStop)
})
