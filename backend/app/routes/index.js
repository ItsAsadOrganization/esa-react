const express = require('express');
const { SUCCESS } = require('../common/exceptions');
const userRouter = require('./user');
const studentsRouter = require('./students');
const voucherRouter = require('./vouchers');
const classesRouter = require('./classes');
const router = express.Router();

router.use("", userRouter)
router.use("", studentsRouter)
router.use("", voucherRouter)
router.use("", classesRouter)

module.exports = router