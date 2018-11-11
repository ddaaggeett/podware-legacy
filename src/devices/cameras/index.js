import { io_camera } from '../../sockets'
import { VideoClip } from '../../objects'

export class Camera {
    constructor(id) {
        this.id = id
        this.recording = false
        this.connect()
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
}

export const queryCameras = () => {
    io_camera.sockets.emit('queryCamera')
}

export const toggleCameraRecording = (device) => {
    const cameras = global.podware.cameras
    const cameraIndex = cameras.findIndex(x => x.id == device)
    const currentStatus = cameras[cameraIndex].recording
    global.podware.cameras[cameraIndex].recording = !currentStatus
    global.podware.updateDB(global.podware)
}
