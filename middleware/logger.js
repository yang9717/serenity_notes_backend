const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (msg, logFileName) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${msg}\n`
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        } else {
            await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
        }
    } catch (err) {
        console.error(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.orgin}`, 'reqLogs.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logger, logEvents }