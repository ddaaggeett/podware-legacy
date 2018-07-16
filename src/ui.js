const { getScreenshot, pullScreenShot } = require('./screenshot')
const { startCameras } = require('./camera')
const { spawn, exec } = require('child_process')
const readline = require('readline')

const uiCommands = ['??\thelp', '11\tstart', '22\tstop', '33\tsnap (screenshot all devices)', '00\texit']

const rl = readline.createInterface(process.stdin, process.stdout)

module.exports.runUI = () => {
    exec('clear', (err,stdout,stdin) => {
        if(!err) {
            console.log('==============================')
            rl.setPrompt('\tTHIS IS PODWARE\n\nenter command (\'help\' to list options)\n\n')
            rl.prompt()
            rl.on('line', function(command) {
                const cmd = command.toLowerCase().trim()
                handleCommand(cmd).then(() => console.log('command enter done'))
            })
        }
    })
}

function askHelp() {
    console.log('\nAVAILABLE COMMANDS:\n')
    for(var x = 1; x < uiCommands.length; x++) {
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
            startCameras(global.device_list)
            console.log('\nAND WE\'RE LIVE -->\n') // TODO: announce on promise all cameras are recording
        }
        else if(cmd.includes('stop') || cmd.includes('22')) {
            console.log('stopping')
        }
        else if(cmd.includes('snap') || cmd.includes('33')) {
            console.log('see new screenshots here: ../screenshots/')
            getScreenshot(global.device_list[0]).then(() => { // TODO: for each device
                pullScreenShot(global.device_list[0])
            })
        }
        else {
            console.log('\nCOMMAND UNAVAILABLE\n')
        }
    })
}
