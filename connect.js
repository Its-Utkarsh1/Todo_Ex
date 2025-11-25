const mongoose = require("mongoose");

async function connectToDB(url){
    try{
        await mongoose.connect(url);
    }
    catch{
        console.log("Mongoose connection error:", err.message);
    }
}

module.exports = connectToDB;