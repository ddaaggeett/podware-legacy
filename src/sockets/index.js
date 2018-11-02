import {
    socketPort_cameras,
    socketPort_react,
} from '../../config'
import {
    pullVideoFile,
} from '../usb/adb'
import {
    queryUSBDevices,
} from '../usb'
import {
    queryAvailableMicrophones,
} from '../usb/mics/devices'
import {
    podware,
} from '../db'
import {
    RecordingSession,
} from '../objects'

export const io_camera = require('socket.io').listen(socketPort_cameras)
export const io_react = require('socket.io').listen(socketPort_react)

io_camera.on('connect', (socket) => {
    socket.on('cameraConnected', device => io_react.sockets.emit('logCameraConnect', device))
    socket.on('videoReadyToPull', data => pullVideoFile(data))
})

io_react.on('connect', (socket) => {
    console.log('connected to self')
    socket.on('startNewRecordingSession', sessionID => new RecordingSession(sessionID))
    socket.on('stopRecordingSession', () => podware.currentRecordingSession.stopRecordingSession())
    socket.on('queryUSBDevices', () => queryUSBDevices())
    socket.on('queryAvailableMicrophones', () => queryAvailableMicrophones())
})
