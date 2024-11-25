const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    role: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    region_name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,  
        required: true,
    },
    capital: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);
