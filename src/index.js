import { spawn, exec } from 'child_process'
import { cli, browserUI } from './cli'
import { get_adb_device_list } from './devices'
import './server'

console.clear()
get_adb_device_list().then(device_list => {
    global.device_list = device_list
    cli(global.device_list)
})
