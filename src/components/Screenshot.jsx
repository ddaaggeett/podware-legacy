import React, { Component } from 'react'
import { getScreenDimensions } from '../visual/screenshot'
import * as styles from '../assets/css/screenshots.css'

export default class Screenshot extends Component {
    constructor(props) {
        super(props)
        this.deviceID = this.props.device

        getScreenDimensions(this.deviceID).then((dimensions) => {
            this.deviceWidth = dimensions.width
            this.deviceHeight = dimensions.height
        })
    }
    imgClickLocation(e, index) {
        console.log(this.deviceID + ' device\'s dimensions\nw: ' + this.deviceWidth + '\nh: ' + this.deviceHeight)
    }
    render() {
        return (
            <div className={styles.screenshot_object}>
                <p>ADB device: {this.props.device}</p>
                <img src={require('../assets/screenshots/' + this.props.device + '.png')} alt={this.props.device + ' image here'} onClick={(e) => this.imgClickLocation(e, this.props.index)} />
            </div>
        )
    }
}

