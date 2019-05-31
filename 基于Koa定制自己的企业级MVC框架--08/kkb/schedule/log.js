module.exports = app => ({
  interval: '*/3 * * * * *',
  handler() {
    console.log(app)
    console.log('定时任务 嘿嘿 3秒执行一次' + new Date())
  }
})
