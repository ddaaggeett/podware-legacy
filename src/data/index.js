import fs from 'fs'
import path from 'path'

const fileName = 'podware.json'
const dataFilePath = path.join(__dirname, fileName)

export const initData = () => {
    setData({})
}

export const setData = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dataFilePath, JSON.stringify(data), (err) => {
            if(err) console.log('\nthere was an error saving the data to ' + dataFilePath + '\n')
        })
    })
}

export const getData = () => {
    return new Promise((resolve, reject) => {
        const data = fs.readFile(dataFilePath, (err, data) => {
            if(!err) resolve(JSON.parse(data))
        })
    })
}
