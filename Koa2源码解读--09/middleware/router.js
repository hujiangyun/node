class Router {
  constructor() {
    this.stack = []
  }
  register(path, method, middleware) {
    let route = { path, method, middleware }
    this.stack.push(route)
  }
  // 现在只支持get和post，其他的同理
  get(path, middleware) {
    this.register(path, 'get', middleware)
  }
  post(path, middleware) {
    this.register(path, 'post', middleware)
  }
  routes() {
    let stack = this.stack
    return async function(ctx, next) {
      const { url, method } = ctx
      let route
      for (let i = 0; i < stack.length; i++) {
        const item = stack[i]
        if (url === item.path && item.method.indexOf(method) >= 0) {
          route = item.middleware
        }
      }
      if (typeof route === 'function') {
        route(ctx, next)
        return
      }
      await next()
    }
  }
}

module.exports = Router
