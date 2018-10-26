import React, { Component } from 'react'
import Monitor from './Monitor'

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
                <Monitor {...this.props} />
            </div>
        )
    }
}
