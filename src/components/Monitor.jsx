import React, { Component } from 'react'
import Screenshots from './Screenshots'
import Microphones from './Microphones'
import {
    handleScreenshots,
    adbSnapAndDisplay,
} from '../adb/screenshot'
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

        socket.on('logAvailableAudioDevices', audioDeviceList => {
            const currentAppState = this.props.app
            const newAppState = {
                ...currentAppState,
                availableAudioDevices: audioDeviceList
            }
            socket.emit('updateAppState', newAppState)
        })
    }

    handleSetAudioDevices(text) {
        const currentAppState = this.props.app
        const devicesStrings = text.split(' ')
        var devices = []
        for(var x = 0; x < devicesStrings.length; x++) {
            const device = parseInt(devicesStrings[x])
            devices.push(device)
        }
        const newAppState = {
            ...currentAppState,
            selectedMicrophones: devices
        }
        socket.emit('updateAppState', newAppState)
    }

    handleFullRecordStart() {
        console.log('start recording all devices')
        const timestamp = Date.now()
        /* audio */
        const selectedMicrophones = this.props.app.selectedMicrophones
        socket.emit('triggerStartAudio', {timestamp, selectedMicrophones})
        /* video */
        socket.emit('triggerStartVideo', timestamp)
    }

    handleFullRecordStop() {
        console.log('stop recording all devices')
        /* audio */
        socket.emit('triggerStopAudio')
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
                    <input className={styles.setAudioDevices} placeholder="set microphone indexes to record - eg: 0 1 3 4" onChange={(e) => this.handleSetAudioDevices(e.target.value)} />
                </div>
                <Microphones {...this.props} />
                <div className={styles.controllerRow}>
                    {/*<Screenshots {...this.props} />*/}
                </div>
            </div>
        )
    }
}
