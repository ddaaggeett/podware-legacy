import React, { Component } from 'react'
import Screenshots from './Screenshots'
import Microphones from './Microphones'
import {
    handleScreenshots,
    adbSnapAndDisplay,
} from '../usb/adb/screenshot'
import * as styles from '../assets/css/gui.css'
import {
    serverIP,
    socketPort_react,
} from '../../config'
import io from 'socket.io-client'
const socket = io.connect('http://' + serverIP + ':' + socketPort_react)

export default class RecordingControl extends Component {
    constructor(props) {
        super(props)

        socket.emit('queryUSBDevices')

        socket.on('logADBDevices', adbDevices => {
            const currentAppState = this.props.app
            const newAppState = {
                ...currentAppState,
                adbDevices
            }
            socket.emit('updateAppState', newAppState)
        })

        socket.on('logCameraConnect', device => {
            const currentAppState = this.props.app
            if(!currentAppState.connectedCameras.includes(device)) {
                const newAppState = {
                    ...currentAppState,
                    connectedCameras: [
                        ...currentAppState.connectedCameras,
                        device
                    ]
                }
                socket.emit('updateAppState', newAppState)
            }
        })

        socket.on('logAvailableMicrophones', audioDeviceList => {
            const currentAppState = this.props.app
            const newAppState = {
                ...currentAppState,
                availableMicrophones: audioDeviceList,
            }
            socket.emit('updateAppState', newAppState)
        })
    }

    handleFullRecordStart() {
        console.log('start recording all devices')
        socket.emit('startNewRecordingSession', Date.now())
    }

    handleFullRecordStop() {
        console.log('stop recording all devices')
        socket.emit('stopRecordingSession')
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
                <Microphones {...this.props} />
                <div className={styles.controllerRow}>
                    {/*<Screenshots {...this.props} />*/}
                </div>
            </div>
        )
    }
}
