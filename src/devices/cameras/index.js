import { io_camera } from '../../sockets'
import { VideoClip } from '../../objects'

export class Camera {
    constructor(id) {
        this.id = id
        this.recording = false
        this.connect()
    }

    connect() {
        const cameras = global.podware.connectedCameras
        var exists = false
        for(var x = 0; x < cameras.length; x++) {
            if(cameras[x].id == this.id) {
                exists = true
                break
            }
        }
        if(!exists) {
            global.podware.connectedCameras = [
                ...global.podware.connectedCameras,
                this
            ]
            global.podware.updateDB(global.podware)
        }
    }
}

export const queryCameras = () => {
    io_camera.sockets.emit('queryCamera')
}
