const { spawn, exec } = require('child_process')
const { runUI } = require('./src/ui')
const { getScreenshot, pullScreenShot } = require('./src/screenshot')
const { get_adb_device_list } = require('./src/devices')
const { startCameras } = require('./src/camera')

get_adb_device_list().then(device_list => {
    console.log('adb devices available:\n' + device_list + '\n')
    runUI()
    startCameras(device_list) // TODO: prompt by user
    getScreenshot(device_list[0]).then(() => { // TODO: prompt by user
        pullScreenShot(device_list[0])
    })
})
