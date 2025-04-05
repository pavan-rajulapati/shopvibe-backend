const mongoose = require('mongoose')

const whishlistSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        index : true
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },

}, {timestamps : true})

module.exports = mongoose.model('Wishlist',whishlistSchema)