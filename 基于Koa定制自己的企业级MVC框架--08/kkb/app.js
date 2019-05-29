// const Koa = require('koa')
// const app = new Koa()
// const { initRouter } = require('./kkb-loader')
// app.use(initRouter().routes())
// app.listen(3000)

// 引用基于koa和koa-router封装的类
const Koa = require('./koa')
const app = new Koa()
app.start(3000)
