const mongoose = require('mongoose');

const connectDB = async (URL) => {
    try {
        await mongoose.connect(URL, {
        });
        console.log("Connected to DB");
    } catch (error) {
        console.error("Connection to DB failed:", error.message);
    }
};

module.exports = connectDB;
