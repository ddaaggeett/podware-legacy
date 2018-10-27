import {
    socketPort_cameras,
    db_host,
    db_port,
    db_name,
    tables,
} from '../../config'
import {
    io_camera,
} from '../sockets'
import {
    appStateChangefeeds,
} from './changefeeds'
import {
    store,
} from '../redux'
import { dbSetup } from './dbSetup'
var r = require('rethinkdb')
var dbConnx

r.connect({
    host: db_host,
    port: db_port,
    db: db_name
}, function (err, connection) {
    dbSetup(connection)
}).then(function(connection) {

    dbConnx = connection

	io_camera.on('connect', socket => {

        socket.on('cameraConnected', function(device) {
            const currentAppState = store.getState().app
            const newAppState = {
                ...currentAppState,
                connectedCameras: [
                    ...currentAppState.connectedCameras,
                    device
                ]
            }
            r.table(tables.appState).update(newAppState).run(connection)
            .then(data => {
                if((data.replaced == 0) && (!data.unchanged == 1)) throw device.concat(' device doesn\'t yet exist. inserting instead.')
            })
            .catch(err => {
                console.log(err)
                r.table(tables.appState).insert(newAppState).run(connection)
            })
        })

        // RethinkDB changefeed
        r.table(tables.appState).changes({ includeInitial: true, squash: true }).run(connection).then(appStateChangefeeds(socket))
	})
})
.error(function(error) {
	console.log('Error connecting to RethinkDB!\n',error)
})

export {
    dbConnx,
}
