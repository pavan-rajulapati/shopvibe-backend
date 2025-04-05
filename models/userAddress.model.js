const mongoose = require('mongoose')

const userAddressSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        index : true
    },
    address : {
        name : {
            type : String ,
            required : true,
            trim : true
        },
        mobileNumber : {
            type : Number ,
            required : true,
            trim : true
        },
        landMark : {
            type : String ,
            required : true,
            trim : true
        },
        street : {
            type : String ,
            required : true,
            trim : true
        },
        city : {
            type : String ,
            required : true,
            trim : true
        },
        pincode : {
            type : String ,
            required : true,
            trim : true
        },
        state : {
            type : String ,
            required : true,
            trim : true
        },
        country : {
            type : String ,
            required : true,
            trim : true
        },
    },
    bankDetails : {
        holderName : {
            type : String,
            trim : true
        },
        bankName : {
            type : String,
            trim : true
        },
        accountNumber : {
            type : String,
            trim : true
        },
        ifscCode : {
            type : String,
            trim : true
        }
    }
}, {timestamps : true})



module.exports = mongoose.model('UserAddress',userAddressSchema)