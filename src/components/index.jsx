import React, { Component } from 'react'
import Monitor from './Monitor'
import { getData } from '../state'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount() {
        this.setState({
            devices: getData().deviceList
        })
    }
    render() {
        return (
            <div>
                <Monitor devices={this.state.devices} />
            </div>
        )
    }
}