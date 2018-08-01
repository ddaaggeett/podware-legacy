import React, { Component } from 'react'
import Monitor from './components/Monitor'

export default class App extends Component {
    constructor(props) {
        super(props)

        const remote = require('electron').remote

        this.state = {
            devices: remote.getGlobal('device_list'),
        }

        console.log('devices: ',this.state.devices)
    }
    render() {
        return (
            <div>
                <Monitor devices={this.state.devices} />
            </div>
        )
    }
}
