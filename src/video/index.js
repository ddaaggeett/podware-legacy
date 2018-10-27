import {
    io_camera,
    io_react,
} from '../sockets'
import {
    pullVideoFile,
} from '../adb/devices'

io_camera.on('connect', (socket) => {
    socket.on('cameraConnected', device => io_react.sockets.emit('logCameraConnect', device))
    socket.on('videoReadyToPull', data => pullVideoFile(data))
})

io_react.on('connect', (socket) => {
    console.log('connected to self')

    socket.on('triggerStartVideo', timestamp => io_camera.sockets.emit('startRecording', timestamp))
    socket.on('triggerStopVideo', () => io_camera.sockets.emit('stopRecording'))
})
