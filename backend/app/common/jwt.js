const jwt = require('jsonwebtoken')

const generateToken = (data) => {
    return jwt.sign({
        data: data
    }, process.env.APP_SECRET, { expiresIn: '5h' });
}

const verifyToken = (token, next) => {
    try {
        var decoded = jwt.verify(token, process.env.APP_SECRET);
        return decoded
    } catch (err) {
        next(err)
    }
}

module.exports = {
    generateToken,
    verifyToken
}