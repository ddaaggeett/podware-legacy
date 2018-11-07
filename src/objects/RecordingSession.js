import {
    io_camera,
} from '../sockets'
import {
    recordAudioDevice,
    killAllAudioInput,
} from '../devices/mics'
import {
    recordingsDir,
} from '../../config'
var fs = require('fs')

export class RecordingSession {
    constructor(sessionID) {
        console.log('recording session init')
        this.id = sessionID
        this.readyMediaFileDir().then(dir => {
            this.mediaDir = dir
            this.recordAudio(dir)
            this.recordVideo()
            global.podware.updateDB(global.podware)
        })
        global.podware.recording = true
        global.podware.currentRecordingSession = this
        global.podware.updateDB(global.podware)
    }

    recordAudio(toDir) {
        global.podware.selectedMicrophones.forEach(index => recordAudioDevice(index, this.id, toDir))
    }

    recordVideo() {
        io_camera.sockets.emit('startRecording', this.id)
    }

    stopRecordingSession() {
        killAllAudioInput()
        io_camera.sockets.emit('stopRecording')
        global.podware.recording = false
        global.podware.updateDB(global.podware)
    }

    readyMediaFileDir() {
        return new Promise((resolve,reject) => {
            const dir = recordingsDir.concat(this.id,'/')
            if(!fs.existsSync(dir)) {
                fs.mkdir(dir, () => resolve(dir))
            }
            else resolve(dir)
        })
    }
}
