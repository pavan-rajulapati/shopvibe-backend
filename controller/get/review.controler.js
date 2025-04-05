const Review = require('../../models/review.model');
const redisClient = require('../../middlewares/redis');
const mongoose = require('mongoose');

const handleReview = async (req, res) => {
    const { productId } = req.query; 

    if (!productId) {
        return res.status(400).json({ message: 'Request data loss: productId is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid productId format' });
    }

    try {
        const redisData = await redisClient.get(`review${productId}`);
        
        if (redisData) {
            const parsedRedisData = JSON.parse(redisData);
            const countData = await Review.countDocuments({ productId });

            if (parsedRedisData.length === countData) {
                return res.status(200).json({ message: 'success', data: parsedRedisData });
            }
        }

        const collectionData = await Review.find({ productId })
        .populate('userId')
        .sort({ createdAt: -1 });

        if (!collectionData || collectionData.length === 0) {
            return res.status(204).json({ message: 'No data available' });
        }

        await redisClient.setEx(`review${productId}`, 60 * 60, JSON.stringify(collectionData));

        return res.status(200).json({ message: 'success', data: collectionData });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error', error: error.message });
    }
};


module.exports = handleReview;
