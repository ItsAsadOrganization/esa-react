const { Op, Sequelize } = require("sequelize")
const PaySlips = require("../../models/payslips")



class PaySlipRepository {
    static async insertPaySlip(payslip) {
        const response = await PaySlips.create(payslip)
        return response
    }


    static async updateSlip(id, payload) {
        const response = await PaySlips.update(payload, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        return response
    }

    static async getPaySlips() {
        const response = await PaySlips.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), Sequelize.fn('MONTH', { [Op.lt]: Sequelize.literal('CURRENT_DATE') })),
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), Sequelize.fn('YEAR', { [Op.lt]: Sequelize.literal('CURRENT_DATE') })),
                ]
            }
        })
        return response
    }
}

module.exports = PaySlipRepository