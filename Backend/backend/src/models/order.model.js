const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [
            {
                category: {
                    type: String,
                    // enum: [
                    //     'Water', 'Vegetables', 'Fruit', 'Ice Cream', 'Rag Picker',
                    //     'Juice', 'Potter', 'Snacks', 'Plant', 'Bedsheets', 'Others',
                    // ],
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'fulfilled', 'cancelled', 'rejected'],
            default: 'pending',
        },
        acceptedAt: {
            type: Date,
        },
        rejectedAt: {
            type: Date,
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
