const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    state: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    galiNumber: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true,
    },
},{timestamps:true});

module.exports = mongoose.model('Location',locationSchema);