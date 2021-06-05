const redis = require('redis');
const { promisify } = require('util')


const redisLink = 'redis://127.0.0.1:6379'
const redisClient = redis.createClient(redisLink);
redisClient.on('error', err => console.log(err))



// 异步读取
const getAsync = promisify(redisClient.get).bind(redisClient);

exports.getItem = getAsync;

/**
 * 
 * @param {键名} key 
 * @param {键值} val 
 * @param {过期时间（秒）} expires 
 */
exports.setItem = (key, val, expires) => {
    redisClient.set(key, val)
    if (expires) {
        redisClient.expire(key, expires);
    }
}
