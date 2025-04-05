const { Redis } = require('@upstash/redis');
require('dotenv').config()

const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

if(redisClient){
    console.log('Redis connection established')
}else
    console.log('Redis connection loss')

module.exports = redisClient;


