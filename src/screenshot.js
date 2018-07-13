const { spawn, exec } = require('child_process')

module.exports.getScreenshot = (device) => {
    return new Promise((resolve,reject) => {
        exec('adb -s ' + device + ' shell screencap -p /sdcard/' + device + '.png', (err,stdout,stdin) => {
            if(err) process.exit()
            resolve()
        })
    })
}
function pullScreenShot(device) {
    return new Promise((resolve,reject) => {
        exec('adb -s ' + device + ' pull /sdcard/' + device + '.png ./screenshots', (err,stdout,stdin) => {
            if(err) process.exit()
            resolve()
        })
    })
}
