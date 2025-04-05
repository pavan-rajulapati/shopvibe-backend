const mongoose  = require('mongoose')

const reviewSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    comment : {
        type : String,
        trim : true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true 
    }

}, {timestamps : true})

reviewSchema.index([
    {userId : 1},
    {productId : 1},
    {comment : 1},
    {rating : 1}
])

module.exports = mongoose.model('Review',reviewSchema)