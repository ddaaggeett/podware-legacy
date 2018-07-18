import express from 'express'
import path from 'path'

export const runServer = () => {
    const app = express()
    app.use('/static', express.static(path.join('src')))
    app.get('*', function (request, response) {
        response.sendFile(path.resolve(__dirname, 'index.html'));
    })
    app.listen(3000, () => console.log('NOTE: supplementary GUI --> http://localhost:3000\n'))
}
