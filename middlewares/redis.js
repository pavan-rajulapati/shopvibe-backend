// redisClient.js
const { Redis } = require('@upstash/redis');
require('dotenv').config();

let redisClient;

try {
  redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  console.log('✅ Redis connection established');
} catch (err) {
  console.error('❌ Redis connection failed:', err.message);
}

module.exports = redisClient;
