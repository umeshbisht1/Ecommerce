
const errorHandler = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "internal server error";
    // mongodb error
    if (err.name === "CastError") {
        err.message = `resource not found ${err.path}`
    }

    // duplicate email::
    if (err.code == 11000) {
        `duplicate ${Object.keys(err.keyValue)} entered`
    }
    // wrong jwt token
    if (err.name === "JsonwebTokenError") {

        err.message = `json web token is invalid bawa`
    }
    //expired json web token
    if (err.name === "TokenExpiredError") {

        err.message = `json web token is expired bawa`
    }
    res.status(err.statuscode).json({

        success: false,
        message: err.message
    })

}
export { errorHandler }