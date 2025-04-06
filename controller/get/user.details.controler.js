const userDetails = require('../../models/userDetails.model');
const setRedisCache = require('../../utils/setRedisCache')

const handleUserDetails = async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        return res.status(400).json({ message: 'Token Required' });
    }

    try {
        const redisCache = await setRedisCache.get(`userDetails:${userId}`);
        if (redisCache) {
            return res.status(200).json({ message: 'success', userData: JSON.parse(redisCache) });
        } else {
            const userData = await userDetails.findById(userId);
            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }

            await setRedisCache(`userDetails:${userId}`, userData, 60 * 60);

            return res.status(200).json({ message: 'success', userData });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error', error: error.message });
    }
};

module.exports = handleUserDetails;