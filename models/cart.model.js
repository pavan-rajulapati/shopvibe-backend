const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        sizes: {
            type: [String],
        },
        colors: {
            type: [String]
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    }
}, { timestamps: true });

cartSchema.index({ userId: 1 });

module.exports = mongoose.model('Cart', cartSchema);
