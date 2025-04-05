const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (error) => {
    console.error('Redis Client Error:', error.message);
});

redisClient.on('connect', () => {
    console.log('Redis connection established');
});

const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};

connectRedis();

module.exports = redisClient;
