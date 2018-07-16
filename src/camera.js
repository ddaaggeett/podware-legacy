const { spawn, exec } = require('child_process')

var numCamerasRecording = 0

module.exports.handleStartCamera = (device) => {
    numCamerasRecording += 1
    openVideoCamera(device) .then(() => {
        toggleRecordVideo(device).then(() => {
            console.log('\nAND WE\'RE LIVE -->\n')
        })
    })
}

module.exports.handleStopCamera = (device) => {
    numCamerasRecording -= 1
    toggleRecordVideo(device).then(() => {
        console.log('\nALL CAMERAS OFF\n')
    })
}

function openVideoCamera(device) {
    return new Promise((resolve, reject) => {
        spawn('adb',['-s', device, 'shell', 'am', 'start', '-a', 'android.media.action.VIDEO_CAPTURE'])
        .stdout.on('data', function(data) {
            setTimeout(() => {
                resolve()
            }, 1000) // TODO: don't rely on setTimeout. improve confirmation camera is up and running
        })
    })
}

function toggleRecordVideo(device) {
    return new Promise ((resolve, reject) => {
        spawn('adb',['-s', device, 'shell', 'input', 'keyevent', '66']).stdout.on('close', () => {
            if(numCamerasRecording == 0 || numCamerasRecording == global.device_list.length) resolve()
        })
    })
}
