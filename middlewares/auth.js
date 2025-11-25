const { validateToken } = require("../service/authentication");
const User = require("../models/user");


async function checkForAuthentication(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.locals.user = null;
        req.user = null;
        return next();
    }
    try {
        const payload = validateToken(token);
        if (!payload) {
            res.locals.user = null;
            req.user = null;
            return next();
        }

        const user = await User.findById(payload._id);
        res.locals.user = user;
        res.user = user;
    }
    catch (err) {
        console.log("Auth error:", err);
        res.locals.user = null;
        req.user = null;
    }
    next();
}

module.exports = {
    checkForAuthentication,
};