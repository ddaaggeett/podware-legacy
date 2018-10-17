import React, { Component } from 'react'
import Screenshots from './Screenshots'
// import { handleStartCameras, handleStopCameras} from '../adb/camera'
import { handleScreenshots } from '../adb/screenshot'
import { listAudioDevices } from '../audio'
import * as styles from '../assets/css/gui.css'

export default class Monitor extends Component {
    constructor(props) {
        super(props)
    }

    handleSetAudioDevices(text) {
        const devices = text.split(' ')
        this.props.setAudioDevices(devices)
    }

    handleFullRecordStart() {
        console.log('start recording all devices')
    }

    handleFullRecordStop() {
        console.log('stop recording all devices')
    }

    render() {
        return (
            <div>
                <div className={styles.controllerRow}>
                    <div className={styles.recordingControlButton} onClick={() => this.handleFullRecordStart()}>start</div>
                    <div className={styles.recordingControlButton} onClick={() => this.handleFullRecordStop()}>stop</div>
                    {/*<div className={styles.recordingControlButton} onClick={() => handleScreenshots(this.props.devices)}>screenshots</div>*/}
                </div>
                <div className={styles.controllerRow}>
                    <div className={styles.listAudioDevices} onClick={() => listAudioDevices()}>list audio devices</div>
                    <input className={styles.setAudioDevices} placeholder="set microphone indexes to record - eg: 0 1 3 4" onChange={(e) => this.handleSetAudioDevices(e.target.value)} />
                </div>
                <div className={styles.controllerRow}>
                    {/*<Screenshots {...this.props} />*/}
                </div>
            </div>
        )
    }
}
