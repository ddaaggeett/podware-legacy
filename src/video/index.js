import {
    exec,
    spawn,
} from 'child_process'
import {
    pullVideoFile,
} from '../adb/devices'
import {
    recordingsDir,
    socketPort,
    socketPort_local,
} from '../../config'
var io_camera = require('socket.io').listen(socketPort)
var io_local = require('socket.io').listen(socketPort_local)

var videoStart
var videoStop

io_camera.on('connect', (socket) => {
    console.log('connected to camera')

    socket.on('videoReadyToPull', data => {
        pullVideoFile(data)
    })

    videoStart = (timestamp) => {
        socket.emit('startRecording', timestamp)
    }

    videoStop = () => {
        socket.emit('stopRecording')
    }
})

io_local.on('connect', (socket) => {
    console.log('connected to self')

    socket.on('triggerStartVideo', (timestamp) => videoStart(timestamp))
    socket.on('triggerStopVideo', videoStop)
})
