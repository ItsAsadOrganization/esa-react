const { INTERNAL_SERVER_ERROR, CREATESUCCESS, SUCCESS } = require("../../common/exceptions")
const printPdf = require("../../common/printServce")
const Repository = require("./repository")
const fs = require('fs');
const path = require("path")

class VoucherManager {
    static async create(payload, next) {
        try {
            const voucher = await Repository.create(payload)
            const _voucher = await Repository.getVoucherById(voucher.dataValues.id)
            if (!_voucher) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new CREATESUCCESS({ voucher: _voucher })
        } catch (err) {
            next(err)
        }
    }

    static async updateVouhcer(id, payload, next) {
        try {
            const _voucher = await Repository.updateVoucher(id, payload)
            if (_voucher === 0) {
                throw new INTERNAL_SERVER_ERROR("Error updating record")
            }
            const voucher = await Repository.getVoucherById(id)
            throw new SUCCESS({ voucher })
        } catch (err) {
            console.log("\n\n\n\n", err)
            next(err)
        }
    }

    static async getVoucherById(id, next) {
        try {
            const _voucher = await Repository.getVoucherById(id)
            if (!_voucher) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new SUCCESS({ voucher: _voucher })
        } catch (err) {
            next(err)
        }
    }

    static async getVoucherClassId(next) {
        try {
            const _voucher = await Repository.getVoucherByClassId()
            if (!_voucher) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new SUCCESS({ voucher: _voucher })
        } catch (err) {
            next(err)
        }
    }

    static async getVouchers(session, next) {
        try {
            const sessionData = session.user
            const paranoid = sessionData.role === "superadmin" ? false : true
            const voucher = await Repository.getAllVouchers(paranoid)
            if (!voucher) {
                throw new SUCCESS({ voucher: [] })
            } else {
                throw new SUCCESS({ voucher })
            }

        } catch (err) {
            next(err)
        }
    }

    static async getStudentVoucher(id, next) {
        try {
            const voucher = await Repository.getStudentVouchers(id)
            if (!voucher) {
                throw new SUCCESS({ voucher: [] })
            } else {
                throw new SUCCESS({ voucher })
            }

        } catch (err) {
            next(err)
        }
    }


    static async printVoucher(voucher_id, next) {
        try {
            const voucher = await Repository.getVoucherById(voucher_id)
            const dir = path.join(path.resolve('./'), "common", "sample.html")
        } catch (err) {
            // next(err)
            console.log(err)
        }
    }
}

module.exports = VoucherManager