const { Router } = require("express");
const Manager = require("../edubiz/vouchers/manager");
let voucherRouter = Router()

voucherRouter.post("/voucher", (req, res, next) => {
    try {
        const paylaod = req.body
        Manager.create(paylaod, next)
    } catch (err) {
        next(err)
    }
})

voucherRouter.get("/voucher", (req, res, next) => {
    try {
        const id = req.query.id
        Manager.getVoucherById(id, next)
    } catch (err) {
        next(err)
    }
})

voucherRouter.get("/voucher/expiring", (req, res, next) => {
    try {
        Manager.getExpiringVouchersApi(next)
    } catch (err) {
        next(err)
    }
})

voucherRouter.get("/vouchers", (req, res, next) => {
    try {
        const session = req.session
        Manager.getVouchers(session, next)
    } catch (err) {
        next(err)
    }
})

voucherRouter.get("/class-vouchers", (req, res, next) => {
    try {
        Manager.getVoucherClassId(next)
    } catch (err) {
        next(err)
    }
})

voucherRouter.get("/voucher/student", (req, res, next) => {
    try {
        const id = req.query.student_id
        Manager.getStudentVoucher(id, next)
    } catch (err) {
        next(err)
    }
})

voucherRouter.put("/voucher", (req, res, next) => {
    try {
        const id = req.query.id
        const paylaod = req.body
        Manager.updateVouhcer(id, paylaod, next)
    } catch (err) {
        next(err)
    }
})

voucherRouter.post("/voucher/print", (req, res, next) => {
    try {
        voucher_id = req.body.voucher_id
        Manager.printVoucher(voucher_id, next)
    } catch (err) {
        // next(err)
        logger.log(err)
    }
})



module.exports = voucherRouter