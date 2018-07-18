import { spawn, exec } from 'child_process'
import { runUI, browserUI } from './src/ui'
import { get_adb_device_list } from './src/devices'

// process.stdout.write('\033c\033[3J') // ~$ clear -> https://gist.github.com/KenanSulayman/4990953#gistcomment-2637835 // TODO: get working with ES6
get_adb_device_list().then(device_list => {
    global.device_list = device_list
    runUI(global.device_list)
})
browserUI()
