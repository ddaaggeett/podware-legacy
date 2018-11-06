import './adb'
import {
    queryADBDevices,
} from './adb'
import {
    queryAvailableMicrophones,
} from './mics/devices'
import { queryCameras, } from './cameras'
import {
    recordingsDir,
} from '../../config'
var usb = require('usb')
var fs = require('fs')

export const queryAllDevices = () => {
    setTimeout(() => {  //  TODO: alternative method. current: able to read adb devices 1 second after usb plug in/out
        queryADBDevices()
        queryAvailableMicrophones()
        queryCameras()
    }, 1000)
}

queryAllDevices()

usb.on('attach', () => {
    queryAllDevices()
})
usb.on('detach', () => {
    queryAllDevices()
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
