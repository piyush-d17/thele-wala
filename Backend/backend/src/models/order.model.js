const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        items: [
            {
                category: {
                    type: String,
                    enum: ['Beverages','Healthy','Desserts','Miscellaneous','Snacks'],
                },
                quantity: {
                    type: Number,
                    min: 1,
                },
            },
        ],
        totalAmount: {
            type: Number,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'fulfilled', 'cancelled'],
            default: 'pending',
        },
        acceptedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
