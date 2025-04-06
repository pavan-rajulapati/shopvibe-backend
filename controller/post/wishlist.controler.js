const Wishlist = require('../../models/wishlist.model')
const setRedisCache = require('../../utils/setRedisCache')

const handleWishlist = async(req,res)=>{
    const {productId} = req.body

    const producIsThere = await Wishlist.findOne({productId})
    if(producIsThere){
        return res.status(302).json({message : 'Product already in wishlist'})
    }

    const userId = req.user._id
    if(!userId){
        return re.status(400).json({ message : 'Token required'})
    }

    try {
        const wishlist = new Wishlist({
            userId ,
            productId
        })
        await wishlist.save()
        await setRedisCache(`wishlist:${userId._id}`, wishlist, 60 * 60)

        return res.status(200).json({message : 'success', wishlist})
    } catch (error) {
        return res.status(500).json({ message : 'Intrenal Error'})
    }
}

module.exports = handleWishlist