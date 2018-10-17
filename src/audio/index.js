import { spawn, exec, spawnSync } from 'child_process'

export const listAudioDevices = () => {
    exec('ffmpeg -f avfoundation -list_devices true -i ""', (err,stdout,stdin) => {
        if(err) {
            console.log('error listing devices')
            console.log(err)
        }
    })
}
