// 中间件导出model
const vip = require('../models/vip')

module.exports = async (cxt, next) => {
  if (cxt.accepts('html') === 'html') {
    // state中间件传值的方法
    cxt.state.vipCourses = await vip.find()
  }
  await next()
}
