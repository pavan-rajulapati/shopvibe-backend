const Review = require('../../models/review.model');
const redisClient = require('../../middlewares/redis');

const handleReview = async (req, res) => {
    const { productId, comment, rating } = req.body;
    const userId = req.user._id;

    if (!userId || !productId || !comment || rating === undefined) {
        return res.status(400).json({ message: 'Fields required' });
    }

    try {
        const review = new Review({
            userId,
            productId,
            comment,
            rating
        });

        await review.save();

        await redisClient.setEx(`review:${productId}`, 60 * 60, JSON.stringify(review));

        return res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        console.error('Error adding review:', error);
        return res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = handleReview;
