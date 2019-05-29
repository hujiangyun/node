// 数据库连接配置
module.exports = {
  db: {
    dialect: 'mysql',
    host: 'localhost',
    database: 'kaikeba',
    username: 'root',
    password: 'example'
  },
  middleware: ['logger'] // 中间件可配置，如果有才进行注册
}
