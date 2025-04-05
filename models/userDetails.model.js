const mongoose = require('mongoose')

const userDetailsSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        index : true
    },
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    gender : {
        type : String,
        enum : ['male','female','others'],
        required : true
    },
    dateOfBirth : {
        type : Date,
        required : true,
        trim : true
    },
    mobileNumber : {
        type : String,
        required : true,
        trim : true
    }
},{ timestamps : true })

module.exports = mongoose.model('userDetails',userDetailsSchema);