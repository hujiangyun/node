module.exports = {
  'get /': async app => {
    let result = await app.$service.user.getName(app)
    result = JSON.parse(result)
    app.ctx.body = '用户名称: ' + result.name
  },
  'get /detail': async app => {
    const age = app.$service.user.getAge()
    app.ctx.body = '用户年龄:' + age
  }
}
