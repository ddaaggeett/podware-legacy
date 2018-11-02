import {
    socketPort_cameras,
    db_host,
    db_port,
    db_name,
    tables,
} from '../../config'
import {
    AppState,
} from '../objects'
import {
    io_react,
} from '../sockets'
import {
    appStateChangefeeds,
} from './changefeeds'
import { dbSetup } from './dbSetup'
var r = require('rethinkdb')
var dbConnx
var appState

r.connect({
    host: db_host,
    port: db_port,
    db: db_name
}, function (err, connection) {
    dbSetup(connection)
}).then(function(connection) {

    dbConnx = connection

	io_react.on('connect', socket => {

        socket.on('updateAppState', newAppState => {
            appState = new AppState(newAppState)
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
    appState,
}
