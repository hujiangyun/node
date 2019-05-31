const Router = require('koa-router')
const route = new Router({ prefix: '/users' })
let users = [{ id: 1, name: 'tom', age: 18 }, { id: 2, name: 'jeery', age: 20 }]
route.get('/', async ctx => {
  const { name } = ctx.query
  let data = users
  if (name) {
    // 返回一个数组
    data = data.filter(u => u.name === name)
  }
  ctx.body = { ok: 1, data }
})

route.get('/:id', async ctx => {
  const { id } = ctx.params
  // 返回一个对象
  const data = users.find(u => u.id == id)
  ctx.body = { ok: 1, data }
})

// 后端字段校验
const bouncer = require('koa-bouncer')
const validate = async (ctx, next) => {
  const hasUser = name => Promise.resolve(name === 'abcabc')
  try {
    // trim过后会放在ctx.vals中
    ctx
      .validateBody('name')
      .required('用户名是必填的')
      .isString()
      .trim()
      .isLength(6, 16, '用户长度应该为6-16')
      .check(await hasUser(ctx.vals.name), 'checkNot') // 自定义校验函数(可以为：数据库中是否有该字段)
    console.log('ctx.vals', ctx.vals)
    next()
  } catch (error) {
    if (error instanceof bouncer.ValidationError) {
      // 如果是bouncer.ValidationError这种错误,next时也可能报错
      ctx.body = '校验错误:' + error.message
      return
    }
    throw error
  }
}

route.post('/', validate, async ctx => {
  const { body: user } = ctx.request
  user.id = users.length + 1
  users.push(user)
  ctx.body = { ok: 1 }
})

route.put('/', async ctx => {
  const { body: user } = ctx.request
  const idx = users.findIndex(u => u.id === user.id)
  if (idx > -1) {
    users[idx] = user
  }
  ctx.body = { ok: 1 }
})

route.delete('/:id', async ctx => {
  const { id } = ctx.params
  const idx = users.findIndex(u => u.id == id)
  if (idx > -1) {
    users.splice(idx, 1)
  }
  ctx.body = { ok: 1 }
})

// 文件上传中间件
const upload = require('koa-multer')({ dest: './public/images' })
route.post('/upload', upload.single('file'), ctx => {
  // 存入对象
  console.log('file', ctx.req.file)
  console.log('body', ctx.req.body)

  //需要写入数据库里面
  ctx.body = '上传成功'
})

route.get('/web', async ctx => {
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
