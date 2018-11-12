import React, { Component } from 'react'
import Screenshots from './Screenshots'
import Microphones from './Microphones'
import Cameras from './Cameras'
import classNames from 'classnames'
import {
    handleScreenshots,
    adbSnapAndDisplay,
} from '../devices/adb/screenshot'
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

        socket.emit('queryAllDevices')

        socket.on('logADBDevices', adbDevices => {
            const currentAppState = this.props.app
            const newAppState = {
                ...currentAppState,
                adbDevices
            }
            socket.emit('updateAppState', newAppState)
        })

        socket.on('logAvailableMicrophones', audioDeviceList => {
            const currentAppState = this.props.app
            const newAppState = {
                ...currentAppState,
                mics: audioDeviceList,
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
                    {
                        this.props.app.recording ?
                        <div className={classNames(styles.recordingControlButton,styles.stopButton)} onClick={() => this.handleFullRecordStop()}>stop</div> :
                        <div className={classNames(styles.recordingControlButton,styles.startButton)} onClick={() => this.handleFullRecordStart()}>start</div>
                    }
                    {/*<div className={styles.recordingControlButton} onClick={() => handleScreenshots(this.props.devices)}>screenshots</div>*/}
                    <div className={styles.recordingControlButton} onClick={() => adbSnapAndDisplay()}>snap+display</div>
                </div>
                <Microphones {...this.props} />
                <Cameras {...this.props} />
                <div className={styles.controllerRow}>
                    {/*<Screenshots {...this.props} />*/}
                </div>
            </div>
        )
    }
}
