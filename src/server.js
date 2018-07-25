import express from 'express'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import FrontEnd from './frontend'

const app = express()
app.use(express.static('static'))
app.get('*', function (request, response) {

    var html = ReactDOMServer.renderToString(
        React.createElement(FrontEnd)
    )
    response.send(html)
})
app.listen(3000, () => console.log('NOTE: supplementary GUI --> http://localhost:3000\n'))
