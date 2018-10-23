import {
    exec,
    spawn,
} from 'child_process'
import {
    recordingsDir,
} from '../../config'
var fs = require('fs')
var path = require('path')

export const get_adb_device_list = () => {
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
                console.error("\nNO ADB DEVICES ATTACHED\n\nPLEASE PLUG IN\n")
                process.exit()
            }
        })
    })
}

export const closeAllRunningApps = (device) => {
    return new Promise((resolve, reject) => {
        exec('adb -s ' + device + ' shell dumpsys window a | grep \'/\' | cut -d \'{\' -f2 | cut -d \'/\' -f1 | cut -d \' \' -f2', (err, stdout, stdin) => {
            if(!err) {
                var runningApps = stdout.toString().split('\n')
                runningApps.forEach((app) => {
                    exec('adb -s ' + device + ' shell am force-stop ' + app)
                })
                resolve()
            }
        })
    })
}

export const pullVideoFile = (data) => {
    const device = data.device
    const pullFilePath = data.pullFilePath
    const videoFileName = path.basename(pullFilePath)
    const outFile = recordingsDir + videoFileName
    spawn('adb',['-s',device,'pull',pullFilePath,outFile]).stdout.on('data',data => {
        if(fs.existsSync(outFile)) {
            console.log(videoFileName + ' exists locally -> now deleting from ' + device)
            exec('adb -s ' + device + ' shell rm -rf ' + pullFilePath, (err,stdout,stdin) => {
                if(err) console.log(err)
            })
        }
    })
}
