import React, { Component } from 'react'
import Screenshots from './Screenshots.jsx'

export default class Monitor extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Screenshots {...this.props} />
            </div>
        )
    }
}
