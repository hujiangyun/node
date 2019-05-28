// 鉴权认证

module.exports = async (ctx, next) => {
  if (!ctx.session.userInfo) {
    ctx.body = {
      ok: 0,
      message: '用户未登录'
    }
  } else {
    await next()
  }
}
