module.exports = app => ({
  'get /': async ctx => {
    let result = await app.$service.user.getName()
    // let result = await app.$model.user.findOne({ where: { id: 1 } })
    // result = JSON.parse(JSON.stringify(result))
    result = JSON.parse(result)
    ctx.body = '用户名称: ' + result.name
  },
  'get /detail': async ctx => {
    const age = app.$service.user.getAge()
    ctx.body = '用户年龄:' + age
  }
})
