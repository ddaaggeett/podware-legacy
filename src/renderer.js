import React from 'react'
import ReactDOM from 'react-dom'
import App from './state/containers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './state/reducers'
import './assets/css/global.css'

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
