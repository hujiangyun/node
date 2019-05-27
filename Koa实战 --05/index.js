// 中间件

const Koa = require('koa')
const app = new Koa()

// const mid1 = async (ctx, next) => {
//   ctx.body = 'Hello'
//   await next()
//   ctx.body += ' !!!!'
// }

// const mid2 = async (ctx, next) => {
//   ctx.type = 'text/html:charset=utf-8'
//   await next()
//   ctx.body += ' OOOO'
// }

// const mid3 = async (ctx, next) => {
//   ctx.body += ' Koa Test'
//   await next()
//   ctx.body += ' Next Test'
// }

// // 输出 "Hello Koa Test Next Test OOOO !!!!"
// app.use(mid1)
// app.use(mid2)
// app.use(mid3)

// 静态文件(前端文件)
const static = require('koa-static')
app.use(static(__dirname + '/public'))

// 响应时间输出
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`输出时间计时 ${ctx.method} ${ctx.url} ${rt}`)
})

// 响应时间计时
app.use(async (ctx, next) => {
  const start = Date.now()
  console.log('开始计时')
  await next() // 相当于下个中间件执行（等待）
  const ms = Date.now() - start
  ctx.set('X-Response-Time', ms + 'ms') // 第一个中间件需要的时间
  console.log(`结束时间 ${ms}ms`)
})

// 错误处理，响应的时候
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500 // 如果写入了statusCode或者status就显示，否则写入500
    ctx.body = error.message

    // 触发应用层级的错误
    ctx.app.emit('error', error, ctx) // 触发node的报错，没有emit时node不会报错
    console.log('中间件捕捉到: ' + error.message)
  }
})

const mongoose = require('./models/mongoose')
const getVip = require('./middleware/get-vip')
app.use(getVip)

// const seelp = time => new Promise(resolve => setTimeout(resolve, time))

// 响应模拟
// app.use(async ctx => {
//   await seelp(200)
//   ctx.status = 200
//   ctx.type = 'html'
//   ctx.body = '<h1>Hello Koa</h1>'
// })

// 模板引擎
const hbs = require('koa-hbs')
app.use(
  hbs.middleware({
    viewPath: __dirname + '/views', // 视图根目录
    defaultLayout: 'layout', //默认布局页面
    partialsPath: __dirname + '/views/partials', // 注册partial的目录（header，footer）
    disableCache: true // 开发阶段不缓存
  })
)

// routes
const index = require('./routes/index')
const users = require('./routes/users')

app.use(index.routes())
app.use(users.routes())

app.on('error', err => {
  console.error(`App 捕捉到了：${err.message}`)
  // throw err // 将会终止服务
})

app.listen(3000, () => {
  // console.log(`App listen at 3000`)
})
