import React, { Component } from 'react'
import Screenshots from './Screenshots'
// import { handleStartCameras, handleStopCameras} from '../adb/camera'
import {
    handleScreenshots,
    adbSnapAndDisplay,
} from '../adb/screenshot'
import {
    listAudioDevices,
    recordAudioDevice,
    killAllAudioInput,
} from '../audio'
import * as styles from '../assets/css/gui.css'
import {
    serverIP,
    socketPort_react,
} from '../../config'
import io from 'socket.io-client'
const socket = io.connect('http://' + serverIP + ':' + socketPort_react)

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
        const timestamp = Date.now()
        console.log('timestamp')
        console.log(timestamp)
        /* audio */
        this.props.app.audioDevices.forEach(index => {
            recordAudioDevice(index,timestamp)
        })
        /* video */
        socket.emit('triggerStartVideo', timestamp)
    }

    handleFullRecordStop() {
        console.log('stop recording all devices')
        /* audio */
        killAllAudioInput()
        /* video */
        socket.emit('triggerStopVideo')
    }

    render() {
        return (
            <div>
                <div className={styles.controllerRow}>
                    <div className={styles.recordingControlButton} onClick={() => this.handleFullRecordStart()}>start</div>
                    <div className={styles.recordingControlButton} onClick={() => this.handleFullRecordStop()}>stop</div>
                    {/*<div className={styles.recordingControlButton} onClick={() => handleScreenshots(this.props.devices)}>screenshots</div>*/}
                    <div className={styles.recordingControlButton} onClick={() => adbSnapAndDisplay()}>snap+display</div>
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
