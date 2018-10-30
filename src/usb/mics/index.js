import { spawn, exec, spawnSync } from 'child_process'
import {
    recordingsDir,
    audioExt,
} from '../../../config'
import {
    io_react,
} from '../../sockets'
import {
    readyFileSaveDir,
} from '..'

export const recordAudioDevice = (index,timestamp) => {
    const audioFileName = timestamp + '_' + index + audioExt
    readyFileSaveDir(timestamp)
    .then(fileSaveDir => {
        const newFile = fileSaveDir + audioFileName
        exec('ffmpeg -f avfoundation -i ":' + index + '" ' + newFile, {
            maxBuffer: 10000000, // 10mB should work? default is 200kB
        }, (err, stdout, stdin) => {
            if(err) {
                console.log('error recording audio ' + index)
                console.log(err)
            }
        })
        console.log('recording device ' + index)
    })
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
