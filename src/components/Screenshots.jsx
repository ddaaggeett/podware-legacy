import React, { Component } from 'react'

const Screenshot = (props) => {
    return (
        <div>
            <p>some device: {props.device}</p>
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
