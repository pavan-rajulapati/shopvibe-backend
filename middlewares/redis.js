const Redis = require('ioredis');

const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on('connect', () => {
  console.log('✅ Redis connection established (Upstash)');
});

redisClient.on('error', (error) => {
  console.error('❌ Redis Client Error:', error.message);
});

module.exports = redisClient;
