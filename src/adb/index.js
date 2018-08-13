import { spawn, exec } from 'child_process'
import { handleScreenshots } from './screenshot'
import { handleStartCameras, handleStopCameras } from './camera'
import readline from 'readline'
import { get_adb_device_list, closeAllRunningApps } from './devices'
import { setData } from '../state'

get_adb_device_list().then((deviceList) => {
    setData({deviceList}) // TODO: keep previous data - insert only new devices
    deviceList.forEach((device) => {
        closeAllRunningApps(device).then(() => console.log('apps closed on ' + device))
    })
    cli(deviceList)
})

const uiCommands = ['??\thelp', '11\tstart', '22\tstop', '33\tsnap (screenshot all devices)', '00\texit']

const rl = readline.createInterface(process.stdin, process.stdout)

export const cli = () => {
    console.log('==============================\n\tTHIS IS PODWARE\n==============================')
    rl.setPrompt('\nenter command (\'help\' to list options)\n\n')
    rl.prompt()
    rl.on('line', function(command) {
        const cmd = command.toLowerCase().trim()
        handleCommand(cmd)
    })
}

function askHelp() {
    console.log('\nAVAILABLE COMMANDS:\n')
    for(var x = 0; x < uiCommands.length; x++) {
        console.log('\t',uiCommands[x])
    }
    console.log()
}

function handleCommand(cmd) {
    return new Promise((resolve, reject) => {
        if(cmd.includes('help') || cmd.includes('??')) {
            askHelp()
        }
        else if(cmd.includes('exit') || cmd.includes('00')) {
            process.exit()
        }
        else if(cmd.includes('start') || cmd.includes('11')) {
            handleStartCameras()
        }
        else if(cmd.includes('stop') || cmd.includes('22')) {
            handleStopCameras()
        }
        else if(cmd.includes('snap') || cmd.includes('33')) {
            handleScreenshots()
        }
        else {
            console.log('\nCOMMAND UNAVAILABLE\n')
        }
    })
}
