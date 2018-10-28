import {
    queryADBDevices,
} from '../adb'
import {
    queryAvailableMicrophones,
} from '../audio/devices'
import {
    io_react,
} from '../sockets'
var usb = require('usb')

usb.on('attach', () => {
    queryUSBDevices()
})
usb.on('detach', () => {
    queryUSBDevices()
})

io_react.on('connect', socket => {
    socket.on('queryUSBDevices', () => {
        queryUSBDevices()
    })
})

export const queryUSBDevices = () => {
    /*adb*/
    queryADBDevices()
    /*microphones*/
    queryAvailableMicrophones()
}
