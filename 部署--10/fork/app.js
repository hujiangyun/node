const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  Math.random() > 0.9 ? aaa() : ''
  await next()
  ctx.body = 'Hi kkb'
})

if (!module.parent) {
  // 第一次加载时(因为第一次加载时，没有父模块)
  console.log('process.argv: ', process.argv)
  const port = process.argv.length > 2 ? process.argv[2] : 3000
  app.listen(port, () => {
    console.log('app start at ' + port)
  })
} else {
  module.exports = app
}
