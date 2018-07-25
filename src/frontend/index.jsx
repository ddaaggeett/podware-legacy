import React, { Component } from 'react'
import Monitor from './components/Monitor'

export default class FrontEnd extends Component {
    constructor(props) {
        super(props)

        this.state = {
            devices: global.device_list,
        }
    }
    render() {
        return (
            <html>
                <head>
                    <title>podware</title>
                    <link rel="stylesheet" href="./style.css" />
                </head>
                <body>
                    <Monitor devices={this.state.devices} />
                </body>
            </html>
        )
    }
}
