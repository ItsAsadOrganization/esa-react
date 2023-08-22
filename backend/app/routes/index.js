const express = require('express');
const userRouter = require('./user');
const studentsRouter = require('./students');
const voucherRouter = require('./vouchers');
const classesRouter = require('./classes');
const LoggingManager = require('../edubiz/logging/manager');
const router = express.Router();

router.use("", userRouter)
router.use("", studentsRouter)
router.use("", voucherRouter)
router.use("", classesRouter)


router.get("/logs", (req, res, next) => {
    LoggingManager.getLogs(next)
})

module.exports = router