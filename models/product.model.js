const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
    },
    brand: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    actualPrice: {
        type: Number,
        required: true,
    },
    offerPrice: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        default: 1
    },
    warranty: {
        type: Number,
        default: 0
    },
    sizes: {
        type: [String],
    },
    colors: {
        type: [String],
    }
}, { timestamps: true });

productSchema.index({ sellerId: 1 }); 
productSchema.index({ name: 1 }); 
productSchema.index({ category: 1 }); 
productSchema.index({ actualPrice: 1 }); 
productSchema.index({ stock: 1 }); 
productSchema.index({ name: 1, category: 1 }); 


module.exports = mongoose.model('Product', productSchema);
