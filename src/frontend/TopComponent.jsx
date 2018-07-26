import React, { Component } from 'react'
import Monitor from './components/Monitor.jsx'

export default class TopComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: global.device_list,
        }
    }
    return (
        <div>
            <Monitor devices={this.state.devices} />
        </div>
    )
}
export default TopComponent
