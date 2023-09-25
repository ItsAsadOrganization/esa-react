const express = require('express');
const userRouter = require('./user');
const studentsRouter = require('./students');
const voucherRouter = require('./vouchers');
const classesRouter = require('./classes');
const LoggingManager = require('../edubiz/logging/manager');
const groupRouter = require('./groups');
const tutorRouter = require('./tutors');
const salaryRouter = require('./salary');
const paySlipRouter = require('./payslips');
const designationRouter = require('./designations');
const appConfigRouter = require('./appconfig');
const campusRouter = require('./campus');
const NotificationRepository = require('../edubiz/notification/repository');
const { SUCCESS } = require('../common/exceptions');
const queryRouter = require('./query');
const roleRouter = require('./role');
const router = express.Router();

router.use("", userRouter)
router.use("", studentsRouter)
router.use("", voucherRouter)
router.use("", classesRouter)
router.use("", groupRouter)
router.use("", tutorRouter)
router.use("", salaryRouter)
router.use("", paySlipRouter)
router.use("", designationRouter)
router.use("", appConfigRouter)
router.use("", campusRouter)
router.use("", queryRouter)
router.use("", roleRouter)


router.get("/logs", (req, res, next) => {
    LoggingManager.getLogs(next)
})

router.put("/noty", async (req, res, next) => {
    try {
        const id = req.query.id
        await NotificationRepository.updateNotification(id)
        throw new SUCCESS({ message: "notificaiton previewed" })
    } catch (err) {
        next(err)
    }
})

module.exports = router