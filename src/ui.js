const { spawn, exec } = require('child_process')
const readline = require('readline')

const uiCommands = ['??\thelp', '11\tstart', '22\tstop', '00\texit']

const rl = readline.createInterface(process.stdin, process.stdout)

module.exports.runUI = () => {
    exec('clear', (err,stdout,stdin) => {
        if(!err) {
            console.log('===========================')
            rl.setPrompt('this is podware\n\nenter any listed command (\'help\' to list options)\n')
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
            console.log('starting')
        }
        else if(cmd.includes('stop') || cmd.includes('22')) {
            console.log('stopping')
        }
        else {
            console.log('\nCOMMAND UNAVAILABLE\n')
        }
    })
}
