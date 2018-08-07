import { spawn, exec } from 'child_process'

var numCamerasRecording = 0

export const handleStartCamera = (device) => {
    numCamerasRecording += 1
    openVideoCamera(device) .then(() => {
        toggleRecordVideo(device).then(() => {
            console.log('\nAND WE\'RE LIVE -->\n')
        })
    })
}

export const handleStopCamera = (device) => {
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
            var deviceList = require('electron').remote.getGlobal('device_list')
            if(numCamerasRecording == 0 || numCamerasRecording == deviceList.length) resolve()
        })
    })
}

export const handleStartCameras = (devices) => {
    devices.forEach(function(device) {
        handleStartCamera(device)
    })
}
export const handleStopCameras = (devices) => {
    devices.forEach(function(device) {
        handleStopCamera(device)
    })
}
