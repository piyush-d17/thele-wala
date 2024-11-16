const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User model
        required: true
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
        type: String,  // Can be a Number if you prefer
        required: true,
    },
    longitude: {
        type: String,  // Can be a Number if you prefer
        required: true,
    },
    capital: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);
