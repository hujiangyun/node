// redis数据库 session存储数据库

const redis = require('redis')
const client = redis.createClient(6379, 'localhost')

client.set('hello', 'redis')
client.get('hello', (err, v) => {
  console.log(`redis key: ${v}`)
})
