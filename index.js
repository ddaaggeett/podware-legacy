const { spawn, exec } = require('child_process')
const { runUI } = require('./src/ui')
const { get_adb_device_list } = require('./src/devices')

get_adb_device_list().then(device_list => {
    process.stdout.write('\033c\033[3J') // ~$ clear -> https://gist.github.com/KenanSulayman/4990953#gistcomment-2637835
    global.device_list = device_list
    runUI(global.device_list)
})
