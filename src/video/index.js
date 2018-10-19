import {
    socketPort,
} from '../../config'
var io = require('socket.io').listen(socketPort)

io.on('connect', (socket) => {
    console.log('connected to camera')
    // socket.emit('startRecording') // TODO: on queue...
    // socket.emit('stopRecording') // TODO: on queue...
})
