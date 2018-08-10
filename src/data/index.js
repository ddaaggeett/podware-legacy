import fs from 'fs'
import path from 'path'

const fileName = 'podware.json'
const dataFilePath = path.join(__dirname, fileName)
const getDataFilePath = 'src/data/' + fileName // TODO: should be same as dataFilePath but doesn't work with getData()

export const initData = () => {
    if(!fs.existsSync(dataFilePath)) setData({})
}

export const setData = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dataFilePath, JSON.stringify(data), (err) => {
            if(err) console.log('\nthere was an error saving the data to ' + dataFilePath + '\n')
            else resolve()
        })
    })
}

export const getData = () => { // TODO: async
    return JSON.parse(fs.readFileSync(getDataFilePath))
}
