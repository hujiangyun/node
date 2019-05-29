// module.exports = {
//   'get /': async ctx => {
//     ctx.body = '首页'
//   },
//   'get /detail': async ctx => {
//     ctx.body = '详情'
//   }
// }

module.exports = app => {
  // console.log(app)
  return {
    // 指向controller层
    'get /': app.$ctrl.home.index,
    'get /detail': app.$ctrl.home.detail
  }
}
