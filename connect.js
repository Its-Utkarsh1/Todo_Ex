const mongoose = require("mongoose");

async function connectToDB(url){
    try{
        await mongoose.connect(url);
    }
    catch(err){
       console.error("Error connecting to DB:", err);
        throw err;
    }
}

module.exports = connectToDB;
