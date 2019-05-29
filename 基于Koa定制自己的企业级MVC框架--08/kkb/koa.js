const Koa = require('koa')
const {
  initRouter,
  initController,
  initServices,
  loadConfig,
  initSchedule
} = require('./koa-loader')

// 封装基于Koa的类并自动加载对应的文件夹注册路由，controller，service
class kkb {
  constructor(conf) {
    this.$app = new Koa(conf)
    loadConfig(this)
    this.$service = initServices() // 必须先执行，不然在routes文件夹里面拿不到$ctrl对象
    this.$ctrl = initController() // 必须先执行，不然在routes文件夹里面拿不到$ctrl对象
    this.$router = initRouter(this)
    this.$app.use(this.$router.routes())
    // initSchedule() // 加载定时任务
  }
  start(port) {
    this.$app.listen(port, () => {
      console.log(`App listen at ${port}`)
    })
  }
}

module.exports = kkb
