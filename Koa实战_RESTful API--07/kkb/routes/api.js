const Router = require('koa-router')
const route = new Router({ prefix: '/api' })
const captcha = require('trek-captcha')

// 图形验证码
route.get('/captcha', async ctx => {
  console.log('captcha', ctx.session.captcha)
  const { token, buffer } = await captcha({ size: 4 })
  ctx.session.captcha = token // 验证
  ctx.body = buffer // 验证码图片
})

module.exports = route
