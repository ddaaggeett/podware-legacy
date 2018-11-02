import{
    appState,
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
        this.recordAudio(sessionID)
        this.recordVideo(sessionID)
    }

    recordAudio(sessionID) {
        const selectedMicrophones = appState.selectedMicrophones
        selectedMicrophones.forEach(index => recordAudioDevice(index, sessionID))
    }

    recordVideo(sessionID) {
        console.log('here @ ' + sessionID)
        io_camera.sockets.emit('startRecording', sessionID)
    }

    stopRecordingSession() {
        killAllAudioInput()
        io_camera.sockets.emit('stopRecording')
    }
}
