import { spawn, exec, spawnSync } from 'child_process'
import {
    recordingsDir,
    audioExt,
} from '../../config'

export const listAudioDevices = () => {
    exec('ffmpeg -f avfoundation -list_devices true -i ""', (err,stdout,stdin) => {
        if(err) {
            console.log('error listing devices:')
            console.log(err)
        }
        else {
            console.log(stdout)
        }
    })
}

export const recordAudioDevice = (index,timestamp) => {
    const newFile = recordingsDir + timestamp + '_' + index + audioExt
    exec('ffmpeg -f avfoundation -i ":' + index + '" ' + newFile, {
        maxBuffer: 10000000, // 10mB should work? default is 200kB
    }, (err, stdout, stdin) => {
        if(err) {
            console.log('error recording audio ' + index)
            console.log(err)
        }
    })
    console.log('recording device ' + index)
}

export const killAllAudioInput = () => {
    exec('killall ffmpeg', (err, stdout, stdin) => {
        if(err) {
            console.log('error killing audio recodings:')
            console.log(err)
        }
        else {
            console.log('kill audio stdout:')
            console.log(stdout)
        }
    })
}
