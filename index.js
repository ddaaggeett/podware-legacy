const { spawn } = require('child_process')

var adb_devices = []

function get_adb_device_list() {

    return new Promise((resolve, reject) => {

        spawn('adb', ['devices']).stdout.on('data', function(data) {
            var devices = []
            var arrayOfStrings = data.toString().split('\n')
            for (var x = 1; x< arrayOfStrings.length; x++) {
                var currentID = arrayOfStrings[x].split('\t')[0]
                if(currentID.length !== 0) devices.push(currentID)
            }
            if(devices.length !== 0) resolve(devices)
            else {
                console.error("\nNO ADB DEVICES ATTACHED\n")
                process.exit()
            }
        })
    })

}

get_adb_device_list()
.then(device_list => {
    console.log('adb devices available:\n' + device_list + '\n')
    startCameras(device_list)
})

function startCameras(devices) {
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
            }, 1000) // TODO: don't rely on setTimeout. imporoe confirmation camera is up and running
        })
    })
}

function toggleRecordVideo(device) {
    return new Promise ((resolve, reject) => {
        spawn('adb',['-s', device, 'shell', 'input', 'keyevent', '66'])
    })
}
