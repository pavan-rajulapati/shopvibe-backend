const redisClient = require('../middlewares/redis');

// Function to set cache
const setRedisCache = async (key, data, ttl = 3600) => {
    try {
        const jsonData = JSON.stringify(data);
        await redisClient.set(key, jsonData, { EX: ttl }); // Set with expiration
    } catch (err) {
        console.error('Error setting Redis cache:', err.message);
    }
};

// Function to get cache
setRedisCache.get = async (key) => {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error('Error getting Redis cache:', err.message);
        return null;
    }
};

module.exports = setRedisCache;
