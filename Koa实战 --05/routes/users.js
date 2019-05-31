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

module.exports = route
