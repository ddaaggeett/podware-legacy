import './adb'
import {
    queryADBDevices,
} from './adb'
import {
    queryAvailableMicrophones,
} from './mics/devices'
import {
    recordingsDir,
} from '../../config'
var usb = require('usb')
var fs = require('fs')

export const queryUSBDevices = () => {
    setTimeout(() => {  //  TODO: alternative method. current: able to read adb devices 1 second after usb plug in/out
        /*adb*/
        queryADBDevices()
        /*microphones*/
        queryAvailableMicrophones()
    }, 1000)
}

queryUSBDevices()

usb.on('attach', () => {
    queryUSBDevices()
})
usb.on('detach', () => {
    queryUSBDevices()
})

export const readyFileSaveDir = (timestamp) => {
    return new Promise((resolve,reject) => {
        const dir = recordingsDir.concat(timestamp,'/')
        if(!fs.existsSync(dir)) {
            fs.mkdir(dir, () => resolve(dir))
        }
        else resolve(dir)
    })
}
