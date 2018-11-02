import React, { Component } from 'react'
import RecordingControl from './RecordingControl'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillReceiveProps(newProps) {
        console.log('newProps')
        console.log(newProps)
    }
    render() {
        return (
            <div>
                <RecordingControl {...this.props} />
            </div>
        )
    }
}
