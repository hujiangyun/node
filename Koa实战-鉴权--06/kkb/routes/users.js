const Router = require('koa-router')
const route = new Router({ prefix: '/users' })

route.get('/', async ctx => {
  // ctx.body = 'users'
  await ctx.render('users', {
    title: '用户列表',
    subTitle: 'handlerbars语法',
    isShow: true,
    htmlStr: '<h1>HHHHH</h1>',
    username: 'tom',
    users: [{ name: 'tome', age: 18 }, { name: 'jeery', age: 36 }]
  })
})

// session方式鉴权
route.post('/login', ctx => {
  const { body } = ctx.request
  console.log('body', body)
  // 登录逻辑(模拟)
  ctx.session.userInfo = body.username
  ctx.body = {
    ok: 1,
    message: '登录成功'
  }
})

route.post('/logout', ctx => {
  delete ctx.session.userInfo
  ctx.body = {
    ok: 1,
    message: '退出系统'
  }
})

// 引用认证中间件（用户）
const auth = require('../middleware/auth')
route.get('/getUser', auth, async ctx => {
  ctx.body = {
    ok: 1,
    message: '获取成功',
    userInfo: ctx.session.userInfo
  }
})

// token方式鉴权
const jwt = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')
const secret = 'it is token'

route.post('/login-token', ctx => {
  const { body } = ctx.request
  console.log('body: ', body)

  // 数据库验证（模拟）
  const userInfo = body.username
  ctx.body = {
    message: '登录成功',
    user: userInfo,
    token: jwt.sign(
      {
        // jwt签名
        data: userInfo, // 使用userinfo进行签名
        exp: Math.floor(Date.now() / 1000) + 60 * 60 // 有效日期（一小时）
      },
      secret
    )
  }
})

// 鉴权,通过koa-jwt自动鉴权
route.get('/getUser-token', jwtAuth({ secret }), async ctx => {
  // 鉴权成功后，会将用户信息自动放到ctx.state.user中
  console.log('state: ', ctx.state.user)
  ctx.body = {
    message: '获取成功',
    userInfo: ctx.state.user
  }
})

module.exports = route
