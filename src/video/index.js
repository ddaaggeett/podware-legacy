import {
    exec,
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

var videoStart
var videoStop

io_remote.on('connect', (socket) => {
    console.log('connected to camera')

    socket.on('videoReadyToPull', (file) => {
        exec('adb pull ' + file + ' ' + recordingsDir, (err, stdout, stdin) => {
            if(err) console.log(err)
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
