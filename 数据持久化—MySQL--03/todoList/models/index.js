const path = require('path')
const fs = require('fs')
const Sequelize = require('sequelize')
// 判断环境
const env = process.env.NODE_ENV || 'development'
// 数据库配置
const conf = require(__dirname + '/../config/config.json')[env]

// 获取当前文件
const basename = path.basename(__filename)
let db = {}

// 创建中间件
let sequelize = new Sequelize(conf.database, conf.username, conf.password, conf)

// 读取当前文件夹（models），注册数据模型
fs.readdirSync(__dirname)
  .filter(file => {
    // 过滤数据模型(除去非js文件和当前文件)
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    // 注册数据模型
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db)
//   }
// })

db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db
