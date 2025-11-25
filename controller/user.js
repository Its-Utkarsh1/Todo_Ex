const User = require("../models/user");
const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = require("../config/config");


async function handleUserRegister(req, res) {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        await User.create({
            name,
            email,
            password,
            role: "user",
        });
        return res.redirect("/login");
    }
    catch (err) {
        console.log("Error in registration", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login");
        }

        const {token} = await User.matchPasswordAndGenerateToken(email, password);
        

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,  //for local host
            sameSite: "strict",
            path: "/"
        });
        return res.redirect("/");
    }
    catch (error) {
        console.log("Error during user login: ", error);
        return res.render("login", { title: "Login Page", error: error.message });
    }
}
async function handleUserLogout(req, res) {
    res.clearCookie("token");
    res.redirect("/");
}

async function createDefaultAdmin() {
    try {
        const adminEmail = ADMIN_EMAIL;
        const adminPassword = ADMIN_PASSWORD;
        const adminName = ADMIN_NAME || "Admin";

        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        const admin = new User({
            name: adminName,
            email: adminEmail,
            password: adminPassword,  
            role: "admin"
        });

        await admin.save(); 

        console.log("Admin created successfully");
    } catch (err) {
        console.log("Error in creating admin:", err);
    }
}


module.exports = {handleUserRegister, handleUserLogin, handleUserLogout, createDefaultAdmin};