import { spawn, exec } from 'child_process'

export const handleScreenshot = (device) => {
    getScreenshot(device).then(() => {
        pullScreenShot(device)
    })
}

const getScreenshot = (device) => {
    return new Promise((resolve,reject) => {
        exec('adb -s ' + device + ' shell screencap -p /sdcard/' + device + '.png', (err,stdout,stdin) => {
            if(err) process.exit()
            resolve()
        })
    })
}
const pullScreenShot = (device) => {
    return new Promise((resolve,reject) => {
        exec('adb -s ' + device + ' pull /sdcard/' + device + '.png ./screenshots', (err,stdout,stdin) => {
            if(err) process.exit()
            resolve()
        })
    })
}
