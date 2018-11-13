import { exec, spawn } from 'child_process'
import { io_camera } from '../../sockets'
import { VideoTrack } from '../../objects'
var path = require('path')
var fs = require('fs')

export class Camera {
    constructor(id,remoteIP) {
        this.id = id
        this.remoteIP = remoteIP
        this.recording = false
        this.connectADB().then(() => {
            this.connect()
        })
    }

    connectADB() {
        return new Promise((resolve,reject) => {
            exec('adb connect ' + this.remoteIP, (err,stdout,stdin) => {
                if(err) {
                    console.log('ERROR CONNECTING ' + this.id + ' TO WIRELESS ADB.')
                    console.log(err)
                    this.adb = this.id
                }
                else {
                    this.adb = this.remoteIP.concat(':5555') // TODO: from original get_adb_device_list()
                }
                resolve()
            })
        })
    }

    connect() {
        const cameras = global.podware.cameras
        var exists = false
        for(var x = 0; x < cameras.length; x++) {
            if(cameras[x].id == this.id) {
                exists = true
                break
            }
        }
        if(!exists) {
            global.podware.cameras = [
                ...global.podware.cameras,
                this
            ]
            global.podware.updateDB(global.podware)
        }
    }

    disconnect() {
        const cameras = global.podware.cameras
        const cameraIndex = cameras.findIndex(x => x.id == this.id)
        const newCameras = [
            ...cameras.slice(0,cameraIndex),
            ...cameras.slice(cameraIndex + 1)
        ]
        global.podware.cameras = newCameras
        global.podware.updateDB(global.podware)
    }

    toggleCameraRecording() {
        const cameras = global.podware.cameras
        const cameraIndex = cameras.findIndex(x => x.id == this.id)
        const currentStatus = cameras[cameraIndex].recording
        global.podware.cameras[cameraIndex].recording = !currentStatus
        global.podware.updateDB(global.podware)
    }

    pullVideoFile(data) {
        const remoteFileSize = data.fileSize
        const pullFilePath = data.pullFilePath
        const timestamp = data.timestamp
        const endTime = data.endTime
        const videoFileName = path.basename(pullFilePath)
        const mediaDir = global.podware.currentRecordingSession.mediaDir
        const outFile = mediaDir + videoFileName
        spawn('adb',['-s',this.adb,'pull',pullFilePath,outFile]).stdout.on('data',data => {
            var flag = true
            while(flag) {
                if(fs.existsSync(outFile) && fs.statSync(outFile).size == remoteFileSize) {
                    new VideoTrack(outFile,endTime)
                    console.log(videoFileName + ' exists locally -> now deleting from ' + this.id)
                    exec('adb -s ' + this.adb + ' shell rm -rf ' + pullFilePath, (err,stdout,stdin) => {
                        if(err) console.log(err)
                    })
                    flag = false
                }
            }
        })
    }
}

export const queryCameras = () => {
    io_camera.sockets.emit('queryCamera')
}
