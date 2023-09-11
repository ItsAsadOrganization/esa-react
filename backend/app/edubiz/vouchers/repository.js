const { Op, Sequelize } = require("sequelize")
const Voucher = require("../../models/voucher")
const sequelize = require("../../common/sequelize")


class VouchersRepository {

    static async create(payload) {
        const voucher = await Voucher.create(payload)
        return voucher
    }

    static async getVoucherById(id) {
        const voucher = await Voucher.findByPk(id)
        return voucher
    }

    static async getVoucherByClassId() {
        const voucher = await Voucher.findAll({
            group: ["classId", "id"]
        })
        return voucher
    }

    static async getAllVouchers(paranoid) {
        const voucher = await Voucher.findAll({ paranoid: paranoid })
        return voucher
    }

    static async getExpiringVouchers() {
        const voucher = await Voucher.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.col("date_expiry"), { [Op.lte]: Sequelize.literal('CURRENT_DATE') }),
                    Sequelize.where(Sequelize.col("is_paid"), { [Op.eq]: 0 }),
                ]
            }
        })
        return voucher
    }

    static async getStudentVouchers(id) {
        const voucher = await Voucher.findAll({
            where: {
                studentID: {
                    [Op.eq]: id
                }
            }
        })
        return voucher
    }

    static async updateVoucher(id, paylaod) {
        const voucher = await Voucher.update(paylaod, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        return voucher
    }
}

module.exports = VouchersRepository