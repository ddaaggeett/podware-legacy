const { spawn, exec } = require('child_process')
const readline = require('readline')

const uiCommands = ['help', 'start', 'stop']

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
    console.log('\navailable user input commands:')
    for(var x = 0; x < uiCommands.length; x++) {
        console.log('\t',uiCommands[x])
    }
    console.log()
}

function handleCommand(cmd) {
    return new Promise((resolve, reject) => {
        if(uiCommands.includes(cmd)) {
            switch(cmd) {
                case 'help':
                    askHelp()
                    break
                default:
                    break
            }
        }
    })
}
