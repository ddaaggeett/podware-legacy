const { spawn, exec } = require('child_process')

module.exports.get_adb_device_list = () => {
    return new Promise((resolve, reject) => {
        spawn('adb', ['devices']).stdout.on('data', function(data) {
            var devices = []
            var arrayOfStrings = data.toString().split('\n')
            for (var x = 1; x< arrayOfStrings.length; x++) {
                var currentID = arrayOfStrings[x].split('\t')[0]
                if(currentID.length !== 0) devices.push(currentID)
            }
            if(devices.length !== 0) resolve(devices)
            else {
                console.error("\nNO ADB DEVICES ATTACHED\n")
                process.exit()
            }
        })
    })
}
