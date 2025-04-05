const Order = require('../../models/order.model');
const redisClient = require('../../middlewares/redis');

const handleOrder = async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        return res.status(400).json({ message: 'Token Required' })
    }

    try {
        const redisCache = await redisClient.get(`order:${userId}`);
        const dataCount = await Order.countDocuments({ userId });

        if (redisCache && JSON.parse(redisCache).length === dataCount) {
            return res.status(200).json({ message: 'success', data: JSON.parse(redisCache) });
        }

        const userData = await Order.find({ userId });
        if (!userData || userData.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        await redisClient.setEx(`order:${userId}`, 60 * 60, JSON.stringify(userData));

        return res.status(200).json({ message: 'success', data: userData });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error', error: error.message });
    }
};

module.exports = handleOrder;
