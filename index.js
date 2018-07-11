const { spawn } = require('child_process')

spawn('adb', ['devices']).stdout.on('data', function(data) {
    var devices = []
    var arrayOfStrings = data.toString().split('\n')
    for (var x = 1; x< arrayOfStrings.length; x++) {
        var currentID = arrayOfStrings[x].split('\t')[0]
        if(currentID.length !== 0) devices.push(currentID)
    }
    if(devices.length !== 0) return devices
    else {
        console.error("\nNO ADB DEVICES ATTACHED\n")
        process.exit()
    }
})
