const mongoose = require('mongoose')

const connectDB = async (URL)=>{
    mongoose.connect(URL).then(()=>{
        console.log("connected to DB")
    }).catch(()=>{
        console.log("connection failed")
    })
}

module.exports = connectDB;