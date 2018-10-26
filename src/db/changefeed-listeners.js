/*
RethinkDB changefeed changefeedListeners
handles redux action dispathes
*/
import * as actionCreators from '../state/actions'
import {
    serverIP,
    socketPort_cameras,
} from '../../config'
import io from 'socket.io-client'
const socket = io.connect('http://' + serverIP + ':' + socketPort_cameras)

function dispatchRedux(changefeedType, store, object) {
    store.dispatch(actionCreators.updateAppState(object))
}

export default function(store) {
    socket.on('changefeed_INSERT_OBJECT', (object) => {
        dispatchRedux('insert', store, object)
    })
	socket.on('changefeed_EDIT_OBJECT', function (object) {
        dispatchRedux('edit', store, object)
	})
	socket.on('changefeed_DELETE_OBJECT', function (object) {
        dispatchRedux('delete', store, object)
	})
}
