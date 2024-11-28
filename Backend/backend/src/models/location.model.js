const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        role: {
            type: String, // Default role if not provided
        },
        ip: {
            type: String,
            required: true,
        },
        region_name: {
            type: String,
            trim: true, // Remove extra spaces from strings
        },
        city: {
            type: String,
            trim: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        capital: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

// Create a unique index for latitude, longitude, and IP
locationSchema.index({ latitude: 1, longitude: 1, ip: 1 }, { unique: true });

module.exports = mongoose.model('Location', locationSchema);
