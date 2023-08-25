const { Router } = require("express");
const Manager = require("../edubiz/groups/manager");
let groupRouter = Router()

// groupRouter.post("/group", (req, res, next) => {
//     try {
//         const paylaod = req.body
//         Manager.create(paylaod, next)
//     } catch (err) {
//         next(err)
//     }
// })

groupRouter.get("/groups", (req, res, next) => {
    try {
        Manager.getAllGroups(req.session, next)
    } catch (err) {
        next(err)
    }
})


module.exports = groupRouter