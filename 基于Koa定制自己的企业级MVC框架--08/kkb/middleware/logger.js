//中间件 log日志
module.exports = async (ctx, next) => {
  console.log(ctx.method + ' ' + ctx.path)
  const now = Date.now()
  await next()
  const duration = Date.now() - now // 响应时间
  console.log(ctx.method + ' ' + ctx.path + ' ' + duration + 'ms')
}
