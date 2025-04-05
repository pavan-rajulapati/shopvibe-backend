const Wishlist = require('../../models/wishlist.model')
const redisClient = require('../../middlewares/redis')
const mongoose = require('mongoose')

const handleWishlist = async(req, res)=>{
    const userId = req.user._id
    if(!userId){
        return res.status(400).json({message : 'token required'})
    }

    try {
        const redisCache = await redisClient.get(`wishlist${userId}`)
        if(redisCache){
            const parsedRedisData = JSON.parse(redisCache)
            const countData = await Wishlist.countDocuments({userId})

            if(parsedRedisData.length === countData){
                return res.status(200).json({message : 'success', data : parsedRedisData})
            }
        }

        const collectionData = await Wishlist.find({userId}).populate('productId')
        if(!collectionData && collectionData.length === 0){
            return res.status(204).json({message : 'Empty data'})
        }

        await redisClient.setEx(`wishlist${userId}`,60 * 60,JSON.stringify(collectionData))
        return res.status(200).json({message : 'success', data : collectionData})
    } catch (error) {
        return res.status(500).json({message : 'Internal Error'})
    }
}

module.exports = handleWishlist