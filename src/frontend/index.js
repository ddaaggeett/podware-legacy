import React from 'react'
import ReactDOM from 'react-dom'
import TopComponent from './TopComponent.jsx'

if (typeof window !== 'undefined') {
    ReactDOM.render(
        React.createElement(TopComponent),
        document.getElementById('root')
    )
}
