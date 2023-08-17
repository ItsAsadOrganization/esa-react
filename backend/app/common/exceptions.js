

const HTTP_STATUS_CODE = {
    "OK": 200,
    "CREATED": 201,
    "PARTIAL_CONTENT": 206,
    "TEMPORARY_REDIRECTED": 301,
    "PERMANENT_REDIRECTED": 302,
    "BAD_REQUEST": 400,
    "UNAUTHORIZED": 401,
    "FORBIDDEN": 403,
    "NOT_FOUND": 404,
    "INTERNAL_SERVER_ERROR": 500

}


class BaseError extends Error {
    constructor(args = "Please preview access logs to debug the problem.", name, statusCode = 500, isOperational, description = "INTERNAL SERVER ERROR") {
        super(description)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.statusCode = statusCode
        this.description = description
        // this.isOperational = isOperational
        if (args) {
            typeof (args) === "string" ? this.data = args : this.data = { ...args }
        }
        // Error.captureStackTrace(this)
    }
}


class NOTFOUND extends BaseError {
    constructor(
        args,
        name,
        description = 'NOT FOUND',
        statusCode = HTTP_STATUS_CODE.NOT_FOUND,
        isOperational = true,
    ) {
        super(args, name, statusCode, isOperational, description)
    }
}

class SUCCESS extends BaseError {
    constructor(
        args,
        name,
        description = 'SUCCESS',
        statusCode = HTTP_STATUS_CODE.OK,
        isOperational = true,
    ) {
        super(args, name, statusCode, isOperational, description)
    }
}

class CREATESUCCESS extends BaseError {
    constructor(
        args,
        name,
        description = 'CREATE SUCCESS',
        statusCode = HTTP_STATUS_CODE.CREATED,
        isOperational = true,
    ) {
        super(args, name, statusCode, isOperational, description)
    }
}

class PERMANENT_REDIRECTED extends BaseError {
    constructor(
        args,
        name,
        description = 'PERMANENT REDIRECTED',
        statusCode = HTTP_STATUS_CODE.PERMANENT_REDIRECTED,
        isOperational = true,
    ) {
        super(args, name, statusCode, isOperational, description)
    }
}

class TEMPORARY_REDIRECTED extends BaseError {
    constructor(
        args,
        name,
        description = 'TEMPORARY REDIRECTED',
        statusCode = HTTP_STATUS_CODE.TEMPORARY_REDIRECTED,
        isOperational = true,
    ) {
        super(args, name, statusCode, isOperational, description)
    }
}

class BAD_REQUEST extends BaseError {
    constructor(
        args,
        name,
        description = 'BAD REQUEST',
        statusCode = HTTP_STATUS_CODE.BAD_REQUEST,
        isOperational = true,
    ) {
        super(args, name, statusCode, isOperational, description)
    }
}

class UNAUTHORIZED extends BaseError {
    constructor(
        args,
        name,
        description = 'UNAUTHORIZED',
        statusCode = HTTP_STATUS_CODE.UNAUTHORIZED,
        isOperational = true,
    ) {
        super(args, name, statusCode, isOperational, description)
    }
}


class FORBIDDEN extends BaseError {
    constructor(
        args,
        name,
        description = 'FORBIDDEN',
        statusCode = HTTP_STATUS_CODE.FORBIDDEN,
        isOperational = true,
    ) {
        super(args, name, statusCode, isOperational, description)
    }
}

class INTERNAL_SERVER_ERROR extends BaseError {
    constructor(
        args,
        name,
        description = 'INTERNAL SERVER ERROR',
        statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        isOperational = true,
    ) {
        super(args, name, statusCode, isOperational, description)
    }
}


module.exports = { INTERNAL_SERVER_ERROR, FORBIDDEN, UNAUTHORIZED, NOTFOUND, SUCCESS, CREATESUCCESS, PERMANENT_REDIRECTED, TEMPORARY_REDIRECTED, BAD_REQUEST }