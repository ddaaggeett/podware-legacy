import { exec } from 'child_process'

export class VideoTrack {

    constructor(file) {
        this.file = file
        const videoTracks = global.podware.currentRecordingSession.videoTracks
        videoTracks.push(this)
        global.podware.currentRecordingSession.videoTracks = videoTracks
        global.podware.updateDB(global.podware)
    }

    getVideoTrackData() {
        return new Promise((resolve,reject) => {
            exec('ffprobe -v quiet -print_format json -show_format ' + this.file, (err,stdout,stdin) => {
                if(err) {
                    console.log('error getFileData():')
                    console.log(err)
                }
                else {
                    const duration = JSON.parse(stdout).format.duration
                    resolve(duration)
                }
            })
        })
    }

    finishRecording(endTime) {
        this.endTime = endTime
        this.getVideoTrackData()
        .then(duration => {
            this.duration = duration
            this.startTime = this.endTime - (this.duration * 1000)
            const videoTracks = global.podware.currentRecordingSession.videoTracks
            const trackIndex = videoTracks.findIndex(x => x.file === this.file)
            const newVideoTracks = [
                ...videoTracks.slice(0,trackIndex),
                this,
                ...videoTracks.slice(trackIndex + 1)
            ]
            global.podware.currentRecordingSession.videoTracks = newVideoTracks
            global.podware.updateDB(global.podware)
        })
    }
}
