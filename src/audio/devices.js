import {
    exec,
} from 'child_process'
import {
    io_react,
} from '../sockets'

export const queryAvailableMicrophones = () => {
    exec('ffmpeg -f avfoundation -list_devices true -i ""', (err,stdout,stdin) => {
        if(err) {
            setAvailableAudioDevices(err)
        }
        else {
            setAvailableAudioDevices(stdout) // TODO: not yet tested
        }
    })
}

export const setAvailableAudioDevices = (textBlob) => {
    const lines = textBlob.toString().split('\n')
    var audioDeviceList = []
    for(var x = 0; x < lines.length; x++) {
        if(lines[x].includes('AVFoundation audio devices')) {
            for(var y = x + 1; y < lines.length; y++) {
                const line = lines[y]
                if(line.includes('AVFoundation input device')) {
                    const pos = line.indexOf('] ')
                    const audioDevice = line.substring(pos + 2)
                    audioDeviceList.push(audioDevice)
                }
            }
        }
    }
    io_react.sockets.emit('logAvailableAudioDevices', audioDeviceList)
}
