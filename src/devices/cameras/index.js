import { io_camera } from '../../sockets'

export class Camera {
    constructor(id) {
        this.id = id
        this.recording = false
    }
}

export const queryCameras = () => {
    io_camera.sockets.emit('queryCamera')
}
