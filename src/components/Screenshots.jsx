import React, { Component } from 'react'
import * as styles from '../assets/css/screenshots.css'

const Screenshot = (props) => {
    return (
        <div className={styles.screenshot_object}>
            <p>ADB device: {props.device}</p>
            <img src={require('../assets/screenshots/' + props.device + '.png')} alt={props.device + ' image here'} />
        </div>
    )
}

export default class Screenshots extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        // this.props.devices.forEach((device) => {
            return (
                <Screenshot device={this.props.devices[0]} />
            )
        // })
    }
}
