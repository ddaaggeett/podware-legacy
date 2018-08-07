import React, { Component } from 'react'
import Screenshots from './Screenshots'
import { handleStartCameras, handleStopCameras} from '../adb/camera'
import { handleScreenshots } from '../adb/screenshot'
import * as styles from '../assets/css/gui.css'

export default class Monitor extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div>
                    <div className={styles.camera_controller_button} onClick={() => handleStartCameras(this.props.devices)}>start cameras</div>
                    <div className={styles.camera_controller_button} onClick={() => handleStopCameras(this.props.devices)}>stop cameras</div>
                    <div className={styles.camera_controller_button} onClick={() => handleScreenshots(this.props.devices)}>screenshots</div>
                </div>
                <Screenshots {...this.props} />
            </div>
        )
    }
}
