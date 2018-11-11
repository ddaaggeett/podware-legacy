import { exec, spawn } from 'child_process'
import { get_adb_device_list } from './devices'
import { recordingsDir } from '../../../config'
var fs = require('fs')
var devices = []

const readyPullDir = (dir) => {
    return new Promise((resolve,reject) => {
        if(!fs.existsSync(dir)) {
            fs.mkdir(dir, () => resolve(dir))
        }
        else resolve(dir)
    })
}

const getDestination = (fileName) => {
    return new Promise((resolve,reject) => {
        const cutDex = fileName.indexOf('_')
        const dir = fileName.substring(0,cutDex)
        const destination = recordingsDir.concat(dir,'/')
        readyPullDir(destination).then((dir) => {
            resolve(dir)
        })
    })
}

const getFileDetails = (device) => {
    return new Promise((resolve,reject) => {
        exec('adb -s ' + device + ' ls /sdcard/podware/', (err,stdout,stdin) => {
            const filesAll = stdout.split('\n')
            var videos = []
            filesAll.forEach(line => {
                if(line.includes('.mp4')) {
                    const lineArray = line.split(' ')
                    const video = {}
                    video.file = lineArray[lineArray.length - 1]
                    getDestination(video.file).then(desination => {
                        video.destination = desination
                        videos.push(video)
                        if(videos.length == devices.length) {
                            resolve(videos)
                        }
                    })
                }
            })
        })
    })
}

get_adb_device_list()
.then(adbDevices => {
    devices = adbDevices
    adbDevices.forEach(device => {
        getFileDetails(device).then(videos => {
            videos.forEach(video => {
                spawn('adb',['-s',device,'pull','/sdcard/podware/' + video.file,video.desination]).stdout.on('data', data => {
                    console.log(data.toString())
                })
            })
        })
    })
})
