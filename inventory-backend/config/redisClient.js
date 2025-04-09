const { createClient } = require('redis');

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_URL_HOST, 
    port: process.env.REDIS_URL_PORT 
  }
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
