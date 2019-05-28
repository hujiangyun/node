const Router = require('koa-router')
const route = new Router({ prefix: '/students' })
const bouncer = require('koa-bouncer')

route.post('/', async ctx => {
  try {
    // 输入验证
    const {
      smsCode: { code, to, expires },
      captcha
    } = ctx.session
    ctx
      .validateBody('phone') // 验证字段--手机号
      .required('必须提供手机号') // 前端必须传入这个字段
      .isString() // 必须是字符串
      .trim() // 去空格
      .match(/1[3-9]\d{9}/, '手机号不合法') // 正则验证
      .eq(to, '请填写接收短信的手机号')
    ctx
      .validateBody('code') // 图形验证码
      .required('必须提供短信验证码') // 前端必须传字段
      .isString()
      .trim()
      .isLength(6, 6, '必须是6位验证码') // 短信验证码长度
      .eq(code, '验证码填写有误') // 校验短信验证码是否正确（和sessio中的code对比）
      .checkPred(() => new Date() - new Date(expires) < 0, '验证码已过期') // 验证短信验证码是否过期
    ctx
      .validateBody('password') // 密码
      .required('必须提供密码') // 前端必传字段
      .isString()
      .trim()
      .match(/[a-zA-Z0-9]{6,16}/, '密码不合法') //验证密码是否合法
    ctx.validateBody('captcha').eq(captcha, '图形验证码有误')

    // 入库, 略
    ctx.body = { ok: 1 }
  } catch (error) {
    if (error instanceof bouncer.ValidationError) {
      console.log(error)
      ctx.status = 401
    } else {
      ctx.status = 500
    }
    ctx.body = { ok: 0, message: error.message }
  }
})
module.exports = router
