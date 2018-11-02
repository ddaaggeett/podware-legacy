import {
    tables,
} from '../../config'
import {
    dbConnx,
}
from '../db'
var r = require('rethinkdb')

export class AppState {

    constructor(newAppState) {
        this.id = newAppState.id
        this.adbDevices = newAppState.adbDevices
        this.availableMicrophones = newAppState.availableMicrophones
        this.selectedMicrophones = newAppState.selectedMicrophones
        this.connectedCameras = newAppState.connectedCameras
        this.recording = newAppState.recording

        this.updateDB(newAppState)
    }

    updateDB(newAppState) {
        r.table(tables.appState).update(newAppState).run(dbConnx)
        .then(data => {
            console.log('update data')
            console.log(data)
            if((data.replaced == 0) && (!data.unchanged == 1)) throw 'App State doesn\'t yet exist. inserting instead.'
        })
        .catch(err => {
            console.log(err)
            r.table(tables.appState).insert(newAppState).run(dbConnx)
        })
    }
}
