const Review = require('../../models/review.model');
const setRedisCache = require('../../utils/setRedisCache')

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

        await setRedisCache(`review:${productId}`, review, 60 * 60);

        return res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        console.error('Error adding review:', error);
        return res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = handleReview;
