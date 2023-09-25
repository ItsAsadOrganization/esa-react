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

userRouter.get("/users", (req, res, next) => {
    try {
        Manager.getAllUsers(next)
    } catch (err) {
        next(err)
    }
})


userRouter.post("/user", (req, res, next) => {
    try {
        const payload = req.body
        Manager.createUser(payload, next)
    } catch (err) {
        next(err)
    }
})


module.exports = userRouter