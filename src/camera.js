const { spawn, exec } = require('child_process')

module.exports.handleStartCamera = (device) => {
    openVideoCamera(device) .then(() => {
        toggleRecordVideo(device)
    })
}

module.exports.handleStopCamera = (device) => {
    toggleRecordVideo(device)
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
        spawn('adb',['-s', device, 'shell', 'input', 'keyevent', '66'])
    })
}
