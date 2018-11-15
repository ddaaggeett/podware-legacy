export const appStateChangefeeds = (socket) => {
	return function(rows) {
		rows.each(function(err, row) {
			if (err) {
				return console.log(err)
			}
			else if (row.new_val && !row.old_val) {	//	insert
				socket.emit('changefeed_INSERT_OBJECT', row.new_val)
			}
			else if (row.new_val && row.old_val) {	//	edit
				socket.emit('changefeed_EDIT_OBJECT', row.new_val)
			}
			else if (row.old_val && !row.new_val) {	//	delete
				socket.emit('changefeed_DELETE_OBJECT', row.old_val)
			}
		})
	}
}

export const sessionsChangefeeds = (socket) => {
	return function(rows) {
		rows.each(function(err, row) {
			if (err) {
				return console.log(err)
			}
			else if (row.new_val && !row.old_val) {	//	insert
				global.podware.currentRecordingSession = row.new_val
				global.podware.updateDB(global.podware)
			}
			else if (row.new_val && row.old_val) {	//	edit
				global.podware.currentRecordingSession = row.new_val
				global.podware.updateDB(global.podware)
			}
			else if (row.old_val && !row.new_val) {	//	delete

			}
		})
	}
}
