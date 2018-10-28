import React, { Component } from 'react'
import {
    serverIP,
    socketPort_react,
} from '../../config'
import io from 'socket.io-client'
const socket = io.connect('http://' + serverIP + ':' + socketPort_react)

class MicrophoneList extends Component {

    constructor(props) {
        super(props)
        this.list = []
    }

    componentWillReceiveProps(newProps) {
        this.list = newProps.list
    }

    render() {
        var microphoneList = []
        this.list.forEach((device, index) => microphoneList.push(<li key={index} index={index}>{device}</li>))
        return (
            <ul>{microphoneList}</ul>
        )
    }
}

export default class Microphones extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        socket.emit('queryAvailableMicrophones')
    }

    render() {
        return (
            <div>
                <div>available microphones:</div>
                <MicrophoneList list={this.props.app.availableAudioDevices} />
            </div>
        )
    }
}
