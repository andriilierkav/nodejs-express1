const EventEmitter = require('events');
const fs = require('fs');
const logFolder = 'var/log';
var os = require("os");

class Logger extends EventEmitter {
    log(...args) {
        console.log(args);
    }
    logToFile(message, fileName = 'log.txt') {
        if (!fs.existsSync(logFolder)) {
            fs.mkdirSync(logFolder, {recursive: true});
        }
        fs.writeFile(logFolder + '/' + fileName, (new Date()).toLocaleDateString() + ': ' + message + os.EOL, {flag: 'a'}, (error) => {
            if (error) throw error;
        });
    }
}

module.exports = Logger;