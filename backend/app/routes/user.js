const { Router } = require("express");
const Manager = require("../edubiz/user/manager");
let userRouter = Router()

userRouter.get("/login", (req, res, next) => {
    try {
        const username = req.query.username
        const password = req.query.password
      
        // res.setHeader("authorization", Buffer.from(sessionID).toString('base64'))
        Manager.login(username, password,res,  next)
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


userRouter.put("/user", (req, res, next) => {
    try {
        const id = req.query.id
        const payload = req.body
        Manager.updateUser(id, payload, next)
    } catch (err) {
        next(err)
    }
})


userRouter.put("/user/chpw", (req, res, next) => {
    try {
        const id = req.query.id
        const payload = req.body
        Manager.updatePassword(id, payload, next)
    } catch (err) {
        next(err)
    }
})


userRouter.delete("/user", (req, res, next) => {
    try {
        const id = req.query.id
        Manager.delete(id, next)
    } catch (err) {
        next(err)
    }
})
module.exports = userRouter