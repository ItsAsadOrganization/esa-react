const winston = require('winston');
const path = require("path")

const logger = null
// const logger = winston.createLogger({
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.simple()
//   ),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: path.join(process.env.LOG_PATH, "access-logs.log"), level:"info" }),
//     new winston.transports.File({ filename: path.join(process.env.LOG_PATH, "error-logs.log"), level:"error" }),
//     new winston.transports.File({ filename: path.join(process.env.LOG_PATH, "debug-logs.log"), level:"debug" })
//   ]
// });

module.exports = logger