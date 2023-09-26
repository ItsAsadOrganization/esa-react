require("dotenv").config()
const exporess = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const session = require("express-session")
const RedisStore = require('connect-redis').default
const redis = require("redis")
const helmet = require('helmet')
var cron = require('node-cron');


const logger = require("./app/common/logging")
const sequelize = require("./app/common/sequelize")
const Users = require("./app/models/users")
const Classes = require("./app/models/classes")
const Students = require("./app/models/students")
const Voucher = require("./app/models/voucher")
const { SUCCESS, UNAUTHORIZED, FORBIDDEN, CONFLICT, NOTFOUND } = require("./app/common/exceptions")
const router = require("./app/routes")
const Logging = require("./app/models/logging")
const multer = require('multer');
const path = require("path")
const Groups = require("./app/models/groups")

const Attachments = require("./app/models/attachments")
const Designations = require("./app/models/designation")
const PaySlips = require("./app/models/payslips")
const Salaries = require("./app/models/salaries")
const Tutor = require("./app/models/tutor")
const AppConfig = require("./app/models/app_config")
const TutorLeaves = require("./app/models/tutor_leaves")
const TutorsAttendance = require("./app/models/tutattendance")
const StudentsAttendance = require("./app/models/stdattendance")
const { CLASSES_MIGRATIONS, USERS_MIGRATIONS, GROUPS, LEAVES_MIGRATIONS, PERMISSIONS_MIGRATIONS } = require("./app/migrations/migrations")
const Notifications = require("./app/models/notification")
const NotificationRepository = require("./app/edubiz/notification/repository")
const VoucherManager = require("./app/edubiz/vouchers/manager")
const Queries = require("./app/models/query")
const GroupManager = require("./app/edubiz/groups/manager")
const GroupRepository = require("./app/edubiz/groups/repository")
const QueryRepository = require("./app/edubiz/query/repository")
const Roles = require("./app/models/roles")

const app = exporess()

const http = require("http").Server(app);

let redisStore = null
app.use(helmet({
    crossOriginResourcePolicy: false,
}))
app.use(cors({ exposedHeaders: "authorization" }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/uploads", exporess.static(path.join(__dirname, "/uploads")))

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

socketIO.on('connection', (socket) => {
    const users = [];
    for (let [id, socket] of socketIO.of("/").sockets) {
        users.push({
            userID: id,
            username: socket.username,
        });
    }
    console.log(`⚡: ${socket.id} user just connected!`);


    socket.on("chat-ended-opened", async () => {
        const queries = await QueryRepository.getAllQueries()
        socket.emit("query-update", { queries })
    })
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});

const PORT = process.env.PORT || 3500


const redisClient = redis.createClient({
    // url: "redis://reids:6379"
    socket: {
        host: "redis",
        port: 6379,
        connectTimeout: 9999
    },
});

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

app.use(async (req, res, next) => {
    try {
        if (!req.originalUrl.includes("login") && !req.originalUrl.includes("uploads") && !req.originalUrl.includes("generate")) {
            if (req.headers.authorization) {
                const sessionKey = `sess:${Buffer.from(req.headers.authorization, 'base64').toString('ascii')}`
                const ttl = await redisClient.ttl(sessionKey)
                if (ttl > 0) {
                    const sessionData = await redisClient.get(sessionKey)
                    req.session.user = JSON.parse(sessionData, null, 2)
                    req.session.touch();
                    next()
                } else {
                    throw new UNAUTHORIZED({ message: "Session expired" })
                }
            } else {
                throw new UNAUTHORIZED({ message: "Missing Authorization token" })
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
        logger.info("Trying to connect to Redis")
        await redisClient.connect()
        logger.info("Redis Connectin Successful")

        logger.info("Redis store initialized")
    } catch (err) {
        logger.error("error connectibg redis ", err)
    }
}



Classes.hasOne(Students, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
Students.belongsTo(Classes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Tutor.hasOne(Salaries, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
Salaries.belongsTo(Tutor, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
Tutor.hasOne(PaySlips, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
PaySlips.belongsTo(Tutor, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})


Classes.hasMany(Voucher, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
Voucher.belongsTo(Classes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Students.hasMany(Voucher, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
Voucher.belongsTo(Students, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Users.hasMany(Logging, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
Logging.belongsTo(Users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Designations.hasMany(Tutor, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
Tutor.belongsTo(Designations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Tutor.hasMany(TutorLeaves, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
TutorLeaves.belongsTo(Tutor, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Tutor.hasMany(TutorsAttendance, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
TutorsAttendance.belongsTo(Tutor, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Students.hasMany(StudentsAttendance, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
StudentsAttendance.belongsTo(Students, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})


Roles.hasMany(Users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
Users.belongsTo(Roles)


Users.hasMany(Queries, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
Queries.belongsTo(Users)



let connect = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })
        await sequelize.sync({ force: false })
        await createDefaultClasses()
        await createDefaultGroups()
        await createDefaultUser()
    } catch (err) {
       logger.error(err)
    }
}


let createDefaultGroups = async () => {
    try {
        GROUPS.forEach(async usr => {
            Groups.findOrCreate({
                where: { name: usr.name },
                defaults: usr
            }).then(([user, created]) => {
                logger.info('Group :', user.name, 'Created:', created)
            })
                .catch(error => {
                    console.error('Error creating or finding group:', error);
                });
        });
    } catch (err) {
        logger.error(err)
    }
}

let createDefaultUser = async () => {
    try {
        USERS_MIGRATIONS.forEach(async usr => {
            Users.findOrCreate({
                where: { name: usr.name },
                defaults: {
                    name: usr.name,
                    email: usr.email,
                    password: usr.password,
                    role: usr.role
                }
            }).then(([user, created]) => {
                logger.info('User:', user.name, 'Created:', created)
            })
                .catch(error => {
                    logger.error('Error creating or finding user:', error);
                });
        });
    } catch (err) {
        logger.log(err)
    }
}


let createDefaultClasses = async () => {

    try {
        CLASSES_MIGRATIONS.forEach(user => {
            Classes.findOrCreate({
                where: { name: user.name }, // Specify the criteria to find the record
                defaults: user, // Provide the attributes to create if the record doesn't exist
            })
                .then(([user, created]) => {
                    logger.log('Classes:', user.name, 'Created:', created);
                })
                .catch(error => {
                    loffer.error('Error creating or finding user:', error);
                });
        });


        LEAVES_MIGRATIONS.forEach(user => {
            AppConfig.findOrCreate({
                where: { name: user.name }, // Specify the criteria to find the record
                defaults: user, // Provide the attributes to create if the record doesn't exist
            })
                .then(([user, created]) => {
                    logger.log('Config for :', user.name, 'Created');
                })
                .catch(error => {
                    logger.error('Error creating or finding user:', error);
                });
        });


        PERMISSIONS_MIGRATIONS.forEach(user => {
            Roles.findOrCreate({
                where: { name: user.name }, // Specify the criteria to find the record
                defaults: user, // Provide the attributes to create if the record doesn't exist
            })
                .then(([user, created]) => {
                    logger.log('Config for Role :', user.name, 'Created');
                })
                .catch(error => {
                    logger.error('Error creating or finding Role config:', error);
                });
        });
    } catch (err) {
        logger.log(err)
    }
}

let scheduleJob = async () => {
    cron.schedule('0 0 * * 0-6', () => {
        VoucherManager.getExpiringVouchers("/api/voucher/expiring")
    });
}
http.listen(PORT, (req, res, next) => {
    connectToRedisStore(req, res, next)
    connect()
    scheduleJob()
})


app.use("/api", router)


app.use((err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
            throw new FORBIDDEN({ message: err.message })
            break;
        case "SequelizeUniqueConstraintError":
            throw new CONFLICT({ message: err.errors[0].message })
            break;
        case "SequelizeDatabaseError":
            throw new NOTFOUND({ message: err.message })
            break;
        default:
            next(err)
            break;
    }
})

// process eroor
app.use(async (err, req, res, next) => {
    let _err = { ...err } // copy err data into _err
    if (typeof _err.data !== "string") { // check if err.data is of string tyoe
        _err = { ..._err, ..._err.data } // err.data is not string then expand err.data to append values to err
        delete _err.data // delete err.data from object
    }

    const sessionData = req.session
    if (!req.originalUrl.includes("/api/logs")) {
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
            // userId: sessionData.userid ? sessionData.userid : sessionData.user.userid
        })
    }
    if (!err.statusCode) {
        err.statusCode = 500
    }

    if (!_err.name) {
        _err.name = "Server Error"
    }

    if (!_err.description) {
        _err.description = "Internal Server Error"
    }
    socketIO.emit("noty", await NotificationRepository.getNotifications())

    res.status(err.statusCode).json({ ..._err })
})
