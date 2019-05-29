module.exports = {
  index: async app => {
    app.ctx.body = await app.$model.user.findAll()
  },
  detail: app => {
    app.ctx.body = 'Ctrl detail'
  }
}
