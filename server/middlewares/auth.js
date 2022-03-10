const { isTokenIncluded, getAccessTokenFromHeader } = require("../helpers/tokenHelpers");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const config = require("../config");

const getAccessToRoute = (req, res, next) => {
    if (!isTokenIncluded(req)) {
        return next(res.status(400).json({
            message: "Token Error"
        }));
    }
    const access_token = getAccessTokenFromHeader(req);
    jwt.verify(access_token, config.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(res.status(400).json({message:"Autherization Error"}));
        }
        req.user = {
            id: decoded.id,
            firstName: decoded.firstName,
            lastName: decoded.lastName
        }
        next();
    })
}

module.exports = {
    getAccessToRoute
}