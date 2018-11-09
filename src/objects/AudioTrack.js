import { exec } from 'child_process'

export class AudioTrack {
    constructor(file,endTime) {
        this.file = file
        this.endTime = endTime
        this.getAudioTrackData()
        .then(data => {
            this.duration = data.duration
            this.startOffset = data.startOffset
            this.startTime = this.endTime - (this.duration * 1000)
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
                    const startOffset = JSON.parse(stdout).format.start_time
                    resolve({duration,startOffset})
                }
            })
        })
    }
}