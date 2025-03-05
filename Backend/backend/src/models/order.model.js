const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        sellers: [
            {
                seller: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                status: {
                    type: String,
                    enum: ['pending', 'accepted', 'rejected'],
                    default: 'pending',
                },
                acceptedAt: {
                    type: Date,
                },
                rejectedAt: {
                    type: Date,
                },
            },
        ],
        items: [
            {
                category: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    min: 1,
                },
            },
        ],
        totalAmount: {
            type: Number,
            min: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'fulfilled', 'cancelled', 'rejected'],
            default: 'pending',
        },
        deliveryDate: {
            type: Date,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);