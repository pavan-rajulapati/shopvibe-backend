const userAddress = require('../../models/userAddress.model');
const redisClient = require('../../middlewares/redis');

const handleUserAddress = async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        return res.status(400).json({ message: 'Token Required' });
    }

    try {
        const redisCache = await redisClient.get(`userAddress:${userId}`);
        if (redisCache) {
            return res.status(200).json({ message: 'success', userData: JSON.parse(redisCache) });
        } else {
            const userData = await userAddress.findById(userId);
            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }

            await redisClient.setEx(`userAddress:${userId}`, 60 * 60, JSON.stringify(userData));

            return res.status(200).json({ message: 'success', userData });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error', error: error.message });
    }
};

module.exports = handleUserAddress;
