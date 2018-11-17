import React, { Component } from 'react'
import * as styles from '../assets/css/microphones.css'
import classNames from 'classnames'
import {
    serverIP,
    socketPort_react,
} from '../../config'
import io from 'socket.io-client'
const socket = io.connect('http://' + serverIP + ':' + socketPort_react)

class Session extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const sessionStyle = classNames(
            styles.micItem,
        )
        return (
            <li className={sessionStyle} onClick={() => this.enterPostProduction(this.props.index)}>{this.props.session}</li>
        )
    }
}

class SessionList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var sessionList = []
        this.props.list.forEach((session, index) => sessionList.push(<Session session={session.name} key={index} index={index} {...this.props} />))
        return (
            <ul className={styles.micList}>{sessionList}</ul>
        )
    }
}

export default class Sessions extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.app.availableSessions != undefined) return (
            <div className={styles.microphones}>
                <div className={styles.microphonesTitle}>recording sessions ready for post produdction:</div>
                <SessionList list={this.props.app.availableSessions} {...this.props} />
            </div>
        )
        else return <div>no recording sessions ready for post production</div>
    }
}
