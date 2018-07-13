const { spawn, exec } = require('child_process')
const readline = require('readline')

const uiCommands = ['help']

const rl = readline.createInterface(process.stdin, process.stdout)

module.exports.runUI = () => {
    console.log('===========================')
    rl.question('\nenter podware command (type \'help\' for list of commands)\n\n', (command) => {
        const cmd = command.toLowerCase().trim()
        handleCommand(cmd).then(() => {
            rl.on('line', function(command) {
                const cmd = command.toLowerCase().trim()
                handleCommand(cmd).then(() =>console.log('inner complete'))
            })
        })
    })
}

function askHelp() {
    console.log('\navailable user input commands:')
    for(var x = 0; x < uiCommands.length; x++) {
        console.log('\t',uiCommands[x])
    }
}

function handleCommand(cmd) {
    return new Promise((resolve, reject) => {
        if(uiCommands.includes(cmd)) {
            switch(cmd) {
                case 'help':
                    askHelp()
                    break
                default:
                    rl.setPrompt('enter podware command')
                    rl.prompt()
                    break
            }
        }
    })
}
