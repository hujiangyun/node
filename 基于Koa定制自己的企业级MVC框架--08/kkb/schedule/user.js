module.exports = {
  interval: '*/8 * * * * *',
  handler() {
    console.log('定时任务 嘿嘿 8秒执行一次' + new Date())
    //
  }
}
