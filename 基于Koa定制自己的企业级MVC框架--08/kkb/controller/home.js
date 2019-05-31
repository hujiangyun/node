// module.exports = app => ({
//   index: async ctx => {
//     ctx.body = await app.$model.user.findAll()
//   },
//   detail: ctx => {
//     ctx.body = 'Ctrl detail'
//   }
// })

module.exports = app => ({
  index: async ctx => {
    ctx.body = await app.$service.user.getName()
    // ctx.body = await app.$model.user.findAll()
  },
  detail: ctx => {
    ctx.body = '详情页面 Ctrl'
  }
})
