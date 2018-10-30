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
    recordAudioDevice,
    killAllAudioInput,
} from '../usb/mics'

export const io_camera = require('socket.io').listen(socketPort_cameras)
export const io_react = require('socket.io').listen(socketPort_react)

io_camera.on('connect', (socket) => {
    socket.on('cameraConnected', device => io_react.sockets.emit('logCameraConnect', device))
    socket.on('videoReadyToPull', data => pullVideoFile(data))
})

io_react.on('connect', (socket) => {
    console.log('connected to self')

    socket.on('triggerStartVideo', timestamp => io_camera.sockets.emit('startRecording', timestamp))
    socket.on('triggerStopVideo', () => io_camera.sockets.emit('stopRecording'))

    socket.on('queryUSBDevices', () => queryUSBDevices())

    socket.on('queryAvailableMicrophones', () => queryAvailableMicrophones())

    socket.on('triggerStartAudio', data => {
        const timestamp = data.timestamp
        const selectedMicrophones = data.selectedMicrophones
        selectedMicrophones.forEach(index => recordAudioDevice(index,timestamp))
    })

    socket.on('triggerStopAudio', () => killAllAudioInput())
})
