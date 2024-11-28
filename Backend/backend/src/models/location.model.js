const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    role: {
        type: String,
    },
    ip: {
        type: String,
    },
    region_name: {
        type: String,
    },
    city: {
        type: String,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,  
    },
    capital: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);
