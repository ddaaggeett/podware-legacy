import { spawn, exec } from 'child_process'
import { runUI, browserUI } from './ui'
import { get_adb_device_list } from './devices'
import './server'

console.clear()
get_adb_device_list().then(device_list => {
    global.device_list = device_list
    runUI(global.device_list)
})
