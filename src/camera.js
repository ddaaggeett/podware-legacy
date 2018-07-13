const { spawn, exec } = require('child_process')

module.exports.startCameras = (devices) => {
    devices.forEach( device => {
        startVideoCamera(device)
        .then((device) => toggleRecordVideo(device))
    })
}

function startVideoCamera(device) {
    return new Promise((resolve, reject) => {
        spawn('adb',['-s', device, 'shell', 'am', 'start', '-a', 'android.media.action.VIDEO_CAPTURE'])
        .stdout.on('data', function(data) {
            setTimeout(() => {
                resolve(device)
            }, 1000) // TODO: don't rely on setTimeout. improve confirmation camera is up and running
        })
    })
}

function toggleRecordVideo(device) {
    return new Promise ((resolve, reject) => {
        spawn('adb',['-s', device, 'shell', 'input', 'keyevent', '66'])
    })
}
