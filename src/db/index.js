import {
    socketPort_cameras,
    db_host,
    db_port,
    db_name,
    tables,
} from '../../config'
import {
    io_react,
} from '../sockets'
import {
    appStateChangefeeds,
} from './changefeeds'
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

	io_react.on('connect', socket => {

        socket.on('updateAppState', function(newAppState) {
            r.table(tables.appState).update(newAppState).run(connection)
            .then(data => {
                console.log('update data')
                console.log(data)
                if((data.replaced == 0) && (!data.unchanged == 1)) throw 'App State doesn\'t yet exist. inserting instead.'
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
