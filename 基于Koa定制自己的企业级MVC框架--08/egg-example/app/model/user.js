// user的model配置sequelize中间件
module.exports = app => {
  const { STRING } = app.Sequelize
  // sequelize配置
  const User = app.model.define(
    'user',
    { name: STRING(30) },
    { timestamps: false }
  )

  // 数据库同步
  // User.sync({ force: true }) // 删除表然后重新创建
  User.sync()
  return User
}
