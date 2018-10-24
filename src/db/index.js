import {
    socketPort_cameras,
    db_host,
    db_port,
    db_name,
    tables,
} from '../../config'
import {
    deviceChangefeeds,
} from './changefeeds'
import { dbSetup } from './dbSetup'
var r = require('rethinkdb')
export const io_camera = require('socket.io').listen(socketPort_cameras)
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
            console.log('\nDUMBO!!\n')
            const newDevice = {
                id: device,
            }
            r.table(tables.devices).update(newDevice).run(connection)
            .then(data => {
                console.log(data)
                if((data.replaced == 0) && (!data.unchanged == 1)) throw device.concat(' device doesn\'t yet exist. inserting instead.')
            })
            .catch(err => {
                console.log(err)
                console.log("inserting new device: " + newDevice.id)
                r.table(tables.devices).insert(newDevice).run(connection)
            })
        })

        // RethinkDB changefeed
        r.table(tables.devices).changes({ includeInitial: true, squash: true }).run(connection).then(deviceChangefeeds(socket))
	})
})
.error(function(error) {
	console.log('Error connecting to RethinkDB!\n',error)
})

export {
    dbConnx,
}
