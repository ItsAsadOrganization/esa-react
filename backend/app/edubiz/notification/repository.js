const Notifications = require("../../models/notification")


class NotificationRepository {
    static async getNotifications() {
        const response = await Notifications.findAll({
            order: [
                ["id", "DESC"]
            ]
        })
        return response
    }

    static async saveNotifications(payload) {
        const response = await Notifications.create(payload)
        return response
    }

    static async updateNotification(id) {
        const response = await Notifications.update({
            is_read: true
        }, {
            where: { id }
        })
        return response
    }
}

module.exports = NotificationRepository