import{
    podware,
} from '../db'
import {
    io_camera,
} from '../sockets'
import {
    recordAudioDevice,
    killAllAudioInput,
} from '../usb/mics'

export class RecordingSession {
    constructor(sessionID) {
        this.id = sessionID
        this.recordAudio()
        this.recordVideo()
        podware.recording = true
        podware.currentRecordingSession = this
        podware.updateDB(podware)
    }

    recordAudio() {
        podware.selectedMicrophones.forEach(index => recordAudioDevice(index, this.id))
    }

    recordVideo() {
        io_camera.sockets.emit('startRecording', this.id)
    }

    stopRecordingSession() {
        killAllAudioInput()
        io_camera.sockets.emit('stopRecording')
        podware.recording = false
        podware.updateDB(podware)
    }
}
