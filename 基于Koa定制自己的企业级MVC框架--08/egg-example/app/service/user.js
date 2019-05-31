const Service = require('egg').Service

class UserService extends Service {
  async getAll() {
    // return [{ name: 'service..' }]
    const { ctx } = this
    // const { User } = ctx.model
    // await User.sync({ force: true }) // 删除然后创建表
    // await User.create({
    //   name: 'loading'
    // })
    // 调用model文件夹中的User文件user表查询
    return await ctx.model.User.findAll()
  }
}

module.exports = UserService
