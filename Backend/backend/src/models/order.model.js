const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    seller: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', 
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'fulfilled', 'cancelled'],
        default: 'pending',
    },
    acceptedAt: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
