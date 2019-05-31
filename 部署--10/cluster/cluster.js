//所有的进程都会加载这个程序
// 如何构建一个高可用的node模块
// cluster模块主要解决的问题(比较流行，大众化)
// 1.故障恢复 -- 出现异常时，会自动恢复
// 2.多核利用 -- 如果出现多核，可以利用多核性能，启动多个分支
// 3.多进程共享端口，多个进程共享一个端口

const cluster = require('cluster')
const os = require('os')
const numCPUs = os.cpus().length
const process = require('process')
console.log('numCPU: ' + numCPUs) // cpu长度

const workers = {}

if (cluster.isMaster) {
  // 主进程,第一进入时
  cluster.on('death', function(worker) {
    // 进程结束时，重新启动进程并放入workers中
    worker = cluster.fork()
    workers[worker.pid] = worker
  })

  // 初始化和CPU数量一致的进程
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork()
    // 子进程
    workers[worker.pid] = worker
  }
} else {
  // 子进程，工作分支
  const app = require('./app')
  app.use(async (ctx, next) => {
    console.log('worker' + cluster.worker.id + ', PID ,', process.pid)
    next()
  })
  app.listen(3000)
}

// 当主进程终止时
process.on('SIGTERM', function() {
  // 关闭所有子进程
  for (var pid in workers) {
    process.kill(pid)
  }
  // 自己也退出
  process.exit(0)
})

// require('./test')
