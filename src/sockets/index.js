import {
    socketPort_cameras,
    socketPort_react,
} from '../../config'
import {
    pullVideoFile,
} from '../devices/adb'
import {
    queryAllDevices,
} from '../devices'
import {
    Camera,
} from '../devices'
import {
    queryAvailableMicrophones,
} from '../devices/mics/devices'
import {
    RecordingSession,
} from '../objects'

export const io_camera = require('socket.io').listen(socketPort_cameras)
export const io_react = require('socket.io').listen(socketPort_react)

io_camera.on('connect', (socket) => {
    const remoteAddress = socket.handshake.address.split(':')
    const remoteIP = remoteAddress[remoteAddress.length - 1]
    var camera

    socket.on('cameraConnected', device => camera = new Camera(device,remoteIP))
    socket.on('videoReadyToPull', data => camera.pullVideoFile(data))
    socket.on('toggleCameraRecording', () => camera.toggleCameraRecording())
    socket.on('disconnect', () => camera.disconnect())
})

io_react.on('connect', (socket) => {
    var session
    socket.on('startNewRecordingSession', sessionID => session = new RecordingSession(sessionID))
    socket.on('stopRecordingSession', () => session.stopRecordingSession())
    socket.on('queryAllDevices', () => queryAllDevices())
    socket.on('queryAvailableMicrophones', () => queryAvailableMicrophones())
})
