// const http = require('http')
// const app = http
//   .createServer((req, res) => {
//     res.writeHead(200)
//     res.end('Hi kaikeba')
//   })
//   .listen(3000)

// 自己封装koa框架
const kkb = require('./kkb')
const app = new kkb()
// const iptable = require('./middleware/iptable')
// app.use(iptable)

const Router = require('./middleware/router')
const router = new Router()

router.get('/', async ctx => {
  ctx.body = 'home page'
})
router.get('/index', async ctx => {
  ctx.body = 'index page'
})
router.get('/post', async ctx => {
  ctx.body = 'post page'
})
router.get('/list', async ctx => {
  ctx.body = 'list page'
})
router.post('/index', async ctx => {
  ctx.body = 'post page'
})

app.use(router.routes())

// const static = require('./middleware/static')
// app.use(static(__dirname + '/public'))

// function delay() {
//   return new Promise((reslove, reject) => {
//     setTimeout(() => {
//       reslove()
//     }, 2000)
//   })
// }

// app.use(async (ctx, next) => {
//   ctx.body = '1'
//   setTimeout(() => {
//     ctx.body += '2'
//   }, 2000)
//   await next()
//   ctx.body += '3'
// })

// app.use(async (ctx, next) => {
//   ctx.body += '4'
//   await delay()
//   await next()
//   ctx.body += '5'
// })

// app.use(async (ctx, next) => {
//   ctx.body += '6'
// })

// app.use((ctx, next) => {
//   ctx.body = 'Hi kkb'
//   next()
//   ctx.body += ' !!!'
// })

// app.use((ctx, next) => {
//   ctx.body += ' Hi kkb'
// })

app.listen(3000, '0.0.0.0', () => {
  console.log('app at listen 3000')
})
