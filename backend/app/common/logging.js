const winston = require('winston');
const path = require("path")

// const logger = null
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(process.cwd(),'logs', "access-logs.log"), level:"info" }),
    new winston.transports.File({ filename: path.join(process.cwd(),'logs', "error-logs.log"), level:"error" }),
    new winston.transports.File({ filename: path.join(process.cwd(),'logs', "debug-logs.log"), level:"debug" })
  ]
});

module.exports = logger