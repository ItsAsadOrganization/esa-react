const { Sequelize } = require("sequelize")
const Queries = require("../../models/query")
const Tutor = require("../../models/tutor")
const Students = require("../../models/students")


class QueryRepository {
    static async getAllQueries(paranoid) {
        const queries = await Queries.findAll({
            paranoid: paranoid,
            attributes: ["id", "contact_medium", "comment", "follow_up", "ended", "createdAt", "studentId", "tutorId",
                [Sequelize.fn('date_format', Sequelize.col('createdAt'), '%m-%d-%Y'), 'modifiedDate']
            ],
            group: ['id', 'modifiedDate'],
        })
        return queries
    }

    static async postQuery(payload) {
        const queries = await Queries.create(payload)
        return queries
    }

    static async getQueryById(id) {
        const queries = await Queries.findByPk(id)
        return queries
    }

    static async getQueryByStudentId(id) {
        const queries = await Queries.findAll({
            raw: true,
            include: [
                {
                    model: Tutor,
                    attributes: ["name"]
                },
                {
                    model: Students,
                    attributes: ["name"]
                }
            ]
            ,
            where: {
                studentId: id
            }
        })
        return queries
    }

    static async updateEnded(id) {
        const queries = await Queries.update({
            ended: true,
        }, {
            where: {
                studentId: id
            }
        })
        return queries
    }
}

module.exports = QueryRepository