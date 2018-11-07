import './adb'
import {
    queryADBDevices,
} from './adb'
import {
    queryAvailableMicrophones,
} from './mics/devices'
import { queryCameras, } from './cameras'
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
