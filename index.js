const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectToDB = require("./connect");
const { checkForAuthentication } = require("./middlewares/auth");
const { createDefaultAdmin } = require("./controller/user");

const userRoutes = require("./router/user");
const taskRoutes = require("./router/task");

const app = express();
app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkForAuthentication);

connectToDB("process.env.MONGO_URL")
    .then(() => {
        console.log("Connected to MongoDB");
        createDefaultAdmin();
    })
    .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.render("index");  
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/dashboard", (req,res)=>{
    res.render("dashboard");
});
app.get("/task", (req,res)=>{
    res.render("task");
})


const PORT = process.env.PORT || 4125;
app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});
