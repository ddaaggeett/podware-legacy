import {
    socketPort_cameras,
    socketPort_react,
} from '../../config'

export const io_camera = require('socket.io').listen(socketPort_cameras)
export const io_react = require('socket.io').listen(socketPort_react)
