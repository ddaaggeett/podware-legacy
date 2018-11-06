import {
    io_camera,
} from '../sockets'
import {
    recordAudioDevice,
    killAllAudioInput,
} from '../devices/mics'

export class RecordingSession {
    constructor(sessionID) {
        this.id = sessionID
        this.recordAudio()
        this.recordVideo()
        global.podware.recording = true
        global.podware.currentRecordingSession = this
        global.podware.updateDB(global.podware)
    }

    recordAudio() {
        global.podware.selectedMicrophones.forEach(index => recordAudioDevice(index, this.id))
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
}
