const { Router } = require("express");
const Manager = require("../edubiz/user/manager");
let userRouter = Router()

userRouter.get("/login", (req, res, next) => {
    try {
        const username = req.query.username
        const password = req.query.password
        const sessionData = req.session
        const sessionID = req.sessionID
        res.setHeader("authorization", Buffer.from(sessionID).toString('base64'))
        Manager.login(username, password, sessionData, next)
    } catch (err) {
        next(err)
    }
})

userRouter.get("/logout", (req, res, next) => {
    try {
        const sessionData = req.session
        Manager.logout(sessionData, next)
    } catch (err) {
        next(err)
    }
})


module.exports = userRouter