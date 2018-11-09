import { exec } from 'child_process'

export class AudioTrack {
    constructor(file) {
        this.file = file
        this.getAudioTrackData()
        .then(data => {
            this.duration = data.duration
            this.startTime = data.startTime
            const audioTracks = global.podware.currentRecordingSession.audioTracks
            audioTracks.push(this)
            global.podware.currentRecordingSession.audioTracks = audioTracks
            global.podware.updateDB(global.podware)
        })
    }

    getAudioTrackData() {
        return new Promise((resolve,reject) => {
            exec('ffprobe -v quiet -print_format json -show_format ' + this.file, (err,stdout,stdin) => {
                if(err) {
                    console.log('error getFileData():')
                    console.log(err)
                }
                else {
                    const duration = JSON.parse(stdout).format.duration
                    const startTime = JSON.parse(stdout).format.start_time
                    resolve({duration,startTime})
                }
            })
        })
    }
}
