// 文件读取
const fs = require('fs')
// 异步函数处理包，处理成一个promise函数
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
//结果为二进制对象,toString转换成utf-8的文件
// const data = fs.readFileSync('../package.json')
// console.log(data.toString())

// 异步读取,将会有回调函数
// fs.readFile('../package.json', (err, data) => {
//   console.log(data.toString())
// })
const readFn = async () => {
  const data = await readFile('../package.json')
  console.log(data.toString())
}
readFn()
// readFile('../package.json').then(res => {
//   console.log(res.toString())
// })
