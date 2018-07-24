import React, { Component } from 'react'

const Screenshot = (props) => {
    console.log(props)
    const deviceImage = "../../assets/screenshots/".concat(props.device, ".png")
    console.log(deviceImage)
    return (
        <div>
            <p>some device: {props.device}</p>
            <img src={require(deviceImage)} />
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
