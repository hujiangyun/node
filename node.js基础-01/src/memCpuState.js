const os = require('os')
// 内存占用率 freemem -空置的内存 / totalmem -总内存
const mem = (os.freemem() / os.totalmem()) * 100
const cpuStat = require('cpu-stat')

module.exports = function() {
  console.log(`内存占用率${mem}%`)
  cpuStat.usagePercent((err, perent) => {
    console.log(`CPU占用率${perent}%`)
  })
}
