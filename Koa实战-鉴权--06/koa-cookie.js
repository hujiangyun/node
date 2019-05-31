const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')
const redisStore = require('koa-redis')
const redis = require('redis')
const redisClient = redis.createClient(6379, 'localhost')
const wrapper = require('co-redis')
const client = wrapper(redisClient) // Promise化

app.keys = ['test cookie']

const SESSION_CONF = {
  key: 'kaikeba', // 键名
  // maxAge: 7 * 24 * 3600, // 过期时间(有效期)
  // httpOnly: true, // 防止js读取，服务器读取
  // signed: true, // 对cookie进行再次签名
  store: redisStore({ client }) // 初始化redisStroe
}

// 使用session
app.use(session(SESSION_CONF, app))

app.use(ctx => {
  // 查看redis
  redisClient.keys('*', (err, keys) => {
    console.log('keys ', keys)
    keys.forEach(key => {
      redisClient.get(key, (error, value) => {
        console.log('value: ', value)
      })
    })
  })

  if (ctx.path === '/favicon.ico') return
  let n = ctx.session.count || 0
  ctx.session.count = ++n
  ctx.body = `这是第${n}次访问!!!!!`
})

app.listen(3000)
