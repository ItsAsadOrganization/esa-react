require("dotenv").config()
const exporess = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const session = require("express-session")
const RedisStore = require('connect-redis').default
const redis = require("redis")
// const logger = require("./app/common/logging")
const sequelize = require("./app/common/sequelize")
const Users = require("./app/models/users")
const Classes = require("./app/models/classes")
const Students = require("./app/models/students")
const Voucher = require("./app/models/voucher")
const { SUCCESS, UNAUTHORIZED } = require("./app/common/exceptions")
const router = require("./app/routes")
const Logging = require("./app/models/logging")
const multer = require('multer');


const app = exporess()
let redisStore = null

app.use(cors({ exposedHeaders: "authorization" }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3500

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})
redisStore = new RedisStore({
    client: redisClient,
});

app.use(
    session({
        store: redisStore,
        secret: process.env.APP_SECRET, // Secret key for session encryption
        resave: false, // Whether to save the session for every request
        saveUninitialized: false, // Whether to save uninitialized sessions
        cookie: {
            secure: false, // Set to true if using HTTPS
            maxAge: 1000 * 60 * 60 * 1, // Session expiration time (in milliseconds)
        },
    })
);

const upload = multer({ dest: 'uploads/' });

app.use(async (req, res, next) => {
    try {
        if (!req.originalUrl.includes("login")) {
            if (req.headers.authorization) {
                const sessionKey = `sess:${Buffer.from(req.headers.authorization, 'base64').toString('ascii')}`
                const ttl = await redisClient.ttl(sessionKey)
                if (ttl > 0) {
                    req.session.touch();
                    next()
                } else {
                    throw new UNAUTHORIZED("Session expired")
                }
            } else {
                throw new UNAUTHORIZED("Missing Authorization token")
            }
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
})

let connectToRedisStore = async (req, res, next) => {
    try {
        // logger.info("Trying to connect to Redis")
        await redisClient.connect()
        // logger.info("Redis Connectin Successful")

        // logger.info("Redis store initialized")
    } catch (err) {
        console.log(err)
        // logger.error("error connectibg redis ", err)
    }
}



Classes.hasOne(Students)
Students.belongsTo(Classes)

Classes.hasMany(Voucher)
Voucher.belongsTo(Classes)

Students.hasMany(Voucher)
Voucher.belongsTo(Students)

Users.hasMany(Logging)
Logging.belongsTo(Users)

let connect = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: false })
    } catch (err) {
        console.log(err)
    }
}


let createDefaultUser = async () => {
    try {
        const [user, created] = await Users.findOrCreate({
            where: { name: "admin" },
            defaults: {
                name: "admin",
                email: "admin@admin.com",
                password: "P@ssw0rd123*",
                role: "admin"
            }
        })

        if (user) {
            // logger.info("User Already exists")
            console.log("Users Exists")
        }
        if (created) {
            // logger.info("User Created")
            console.log("User created")
        }
    } catch (err) {
        console.log(err)
    }
}

let createDefaultClasses = async () => {

    try {
        const classes = [
            { name: "9th" },
            { name: "10th" },
            { name: "11th" },
            { name: "12th" },
            { name: "IELTS" },
            { name: "IDP" },
            { name: "Computer Courses" },
        ]

        classes.forEach(user => {
            Classes.findOrCreate({
                where: { name: user.name }, // Specify the criteria to find the record
                defaults: user, // Provide the attributes to create if the record doesn't exist
            })
                .then(([user, created]) => {
                    console.log('User:', user.name, 'Created:', created);
                })
                .catch(error => {
                    console.error('Error creating or finding user:', error);
                });
        });

        // const i = await Classes.bulkCreate(classes, {
        //     updateOnDuplicate: ['name'], // Specify the columns to update on duplicate
        //     upsert: false, // Perform an update or create operation
        // })
        // if (i) {
        //     connect.log("Classes added")
        // }
    } catch (err) {
        console.log(err)
    }
}
app.listen(PORT, (req, res, next) => {
    connectToRedisStore(req, res, next)
    connect()
    createDefaultUser()
    createDefaultClasses()
})

app.use("/api", router)

// process eroor
app.use(async (err, req, res, next) => {
    let _err = { ...err } // copy err data into _err
    if (typeof _err.data !== "string") { // check if err.data is of string tyoe
        _err = { ..._err, ..._err.data } // err.data is not string then expand err.data to append values to err
        delete _err.data // delete err.data from object
    }

    const sessionData = req.session
    await Logging.create({
        req_config: {
            url: req.originalUrl,
            body: req.body,
            params: req.params,
            query: req.query,
            sessionId: req.sessionID,
            method: req.method,
            headers: req.headers
        },
        res_config: {
            statusCode: err.statusCode,
            response: { ..._err }
        },
        userId: sessionData.userid
    })
    res.status(err.statusCode).json({ ..._err })
})
