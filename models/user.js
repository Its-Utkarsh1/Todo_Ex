const mongoose = require("mongoose");
const { randomBytes, createHmac } = require('crypto');
const { createTokenForUser } = require("../service/authentication");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum:["user", "admin"], default: "user"},
    salt: {type: String},

});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return;

    const salt = randomBytes(16).toString("hex");
    this.salt = salt;

    this.password = createHmac("sha256", salt)
        .update(this.password)
        .digest("hex");
});



userSchema.statics.matchPasswordAndGenerateToken = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");
    const userHashedPassword = createHmac("sha256", user.salt).update(password).digest("hex");

    if (user.password !== userHashedPassword) throw new Error("Invalid password");
    //Generate Token
    const token = createTokenForUser(user);
    return { token };
}

const User = mongoose.model('User', userSchema);

module.exports = User; 