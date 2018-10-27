import {
    io_camera,
    io_react,
} from '../sockets'
import {
    exec,
    spawn,
} from 'child_process'
import {
    pullVideoFile,
} from '../adb/devices'

var videoStart
var videoStop

io_camera.on('connect', (socket) => {
    console.log('connected to camera')

    socket.on('videoReadyToPull', data => {
        pullVideoFile(data)
    })

    videoStart = (timestamp) => {
        io_camera.sockets.emit('startRecording', timestamp)
    }

    videoStop = () => {
        io_camera.sockets.emit('stopRecording')
    }
})

io_react.on('connect', (socket) => {
    console.log('connected to self')

    socket.on('triggerStartVideo', (timestamp) => videoStart(timestamp))
    socket.on('triggerStopVideo', () => videoStop())
})
