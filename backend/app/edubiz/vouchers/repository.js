const { Op } = require("sequelize")
const Voucher = require("../../models/voucher")


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