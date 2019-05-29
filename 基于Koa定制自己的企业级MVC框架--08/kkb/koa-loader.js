// 自动读取route文件夹中的文件名称注册路由
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
// 1.读取文件名称
function loader(dir, cb) {
  // dir可配置文件夹名称,cb回调函数
  // 获取绝对路径 如model文件夹
  const _url = path.resolve(__dirname, dir)
  // 读取目录
  const files = fs.readdirSync(_url)
  // 遍历文件夹中的js文件
  files.forEach(file => {
    // 去除扩展名替换
    file = file.replace('.js', '')
    // 导入文件
    let filename = require(_url + '/' + file)
    cb(file, filename)
  })
}

// 2.注册路由
function initRouter(app) {
  // appKoa 自己封装的koa类对象
  const router = new Router()
  loader('routes', (filename, routes) => {
    // routes 读取到的文件内容 modul.exports出来的东西
    // 兼容对象和function（routes文件夹里面的写法 -- 指向了controller(service)，service,controlloer中导出的是function）
    routes = typeof routes === 'function' ? routes(app) : routes

    const prefix = filename === 'index' ? '' : `/${filename}`
    Object.keys(routes).forEach(key => {
      const [method, path] = key.split(' ')
      // console.log('正在映射的地址：', method.toLocaleUpperCase(), prefix, path)
      // 注册路由
      // app.get('/',ctx => {})
      router[method](prefix + path, routes[key])
      // router[method](prefix + path, async ctx => {
      //   app.ctx = ctx
      //   await routes[key](app)
      // })
    })
  })
  return router
}

// 读取controller文件夹里的文件
function initController(app) {
  let controllers = {}
  loader('controller', (filename, controller) => {
    // filename文件名，controller文件导出的对象
    controllers[filename] = controller(app)
  })
  return controllers
}

// 读取service文件夹里的文件
function initServices(app) {
  let services = {}
  loader('service', (filename, service) => {
    // filename文件名，service文件导出的对象
    services[filename] = service(app)
  })
  return services
}

// 加载数据库配置和sequelize中间件
const Sequelize = require('sequelize')
function loadConfig(app) {
  loader('config', (filename, conf) => {
    if (conf.db) {
      // 判断是否有db对象（是否为index.js文件）
      // 取出index.js中的db对象，注册sequelize中间件
      app.$db = new Sequelize(conf.db)
      // 加载模型 （model文件夹中的文件）
      app.$model = {}
      loader('model', (filename, config) => {
        const { schema, options } = config
        // 创建define函数，定义数据库模型
        app.$model[filename] = app.$db.define(filename, schema, options)
      })
      // 同步数据库
      app.$db.sync()
    }
    if (conf.middleware) {
      // 加载中间件
      conf.middleware.forEach(mid => {
        // 代码所在文件夹 + middleware + 文件名
        const midPath = path.resolve(__dirname, 'middleware', mid)
        app.$app.use(require(midPath))
      })
    }
  })
}

// 加载定时任务模块
const schedule = require('node-schedule')
function initSchedule(app) {
  loader('schedule', (filename, cb) => {
    // 当定时任务需要调用service层或者controller层的方法时，需要返回一个函数
    const { interval, handler } = typeof cb === 'function' ? cb(app) : cb
    schedule.scheduleJob(interval, handler)
  })
}

module.exports = {
  initRouter,
  initController,
  initServices,
  loadConfig,
  initSchedule
}
// loader('routes', filename => {
//   console.log('routes ' + filename)
// })
