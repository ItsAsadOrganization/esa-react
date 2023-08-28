const { Op } = require("sequelize")
const Tutor = require("../../models/tutor")


class TutorsRepository {
    static async getAllTutors(paranoid) {
        const tutorz = await Tutor.findAll({
            paranoid: paranoid
        })
        return tutorz
    }

    static async getTutorById(id) {
        const tutorz = await Tutor.findByPk(id)
        return tutorz
    }

    static async postTutor(payload) {
        const tutorz = await Tutor.create(payload)
        return tutorz
    }

    static async putTutor(id, payload) {
        const tutorz = await Tutor.update(payload, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        return tutorz
    }

    static async deleteTutor(id) {
        const tutorz = await Tutor.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })

        return tutorz
    }
}

module.exports = TutorsRepository