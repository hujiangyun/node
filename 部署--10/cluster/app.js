const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  Math.random() > 0.9 ? aaa() : ''
  await next()
  ctx.body = 'Hi kkb'
})

if (!module.parent) {
  // 第一次加载时(因为第一次加载时，没有父模块)
  app.listen(3000, () => {
    console.log('app start at 3000')
  })
} else {
  module.exports = app
}
