const { STRING } = require('sequelize')

// 创建数据模型
module.exports = {
  schema: {
    name: STRING(30)
  },
  options: {
    timestamps: false // 去掉创建时间
  }
}
