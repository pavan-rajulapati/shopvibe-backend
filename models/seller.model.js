const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    personalInfo : {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index : true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        mobileNumber: {
            type: String,
            required: true,
            trim: true
        },
        profilePic : {
            type : String,
            trim : true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        bestSeller: {
            type: Boolean,
            default: false
        },
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        pincode: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        }
    },
    bankDetails: {
        holderName: {
            type: String,
            required: true,
            trim: true
        },
        bankName: {
            type: String,
            required: true,
            trim: true
        },
        accountNumber: {
            type: String,
            required: true,
            trim: true
        },
        ifscCode: {
            type: String,
            required: true,
            trim: true
        }
    }
}, { timestamps: true });

sellerSchema.index({ email : 1 })
sellerSchema.index({ mobileNumber : 1 })
sellerSchema.index({ accountNumber : 1 })
sellerSchema.index({ holderName : 1 })
sellerSchema.index({ street : 1 })
sellerSchema.index({ city : 1 })

module.exports = mongoose.model('Seller', sellerSchema);
