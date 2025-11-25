const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const secret = JWT_SECRET;

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    }

    const token = JWT.sign(payload,secret,{expiresIn:"1d"});
    return token;
}

function validateToken(token) {
    try {
        const payload = JWT.verify(token, secret);
        return payload;
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            console.error("❌ Token expired");
        } else {
            console.error("❌ Invalid token:", err.message);
        }
        return null;
    }
}

module.exports ={ createTokenForUser, validateToken};