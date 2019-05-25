// 操作文件系统(写入)，进行持久化

const fs = require('fs')

function get(key) {
  fs.readFile('./db.json', (err, data) => {
    const json = JSON.parse(data)
    console.log(json[key])
  })
}

function set(key, value) {
  fs.readFile('./db.json', (err, data) => {
    // 第一次可能是空文件
    // data是一个Buffer对象，必须toString才能进行js判断
    // 或者使用 '!!' 转换成 bolean对象
    const json = !!data ? JSON.parse(data) : {}
    json[key] = value
    fs.writeFile('./db.json', JSON.stringify(json), err => {
      if (err) {
        console.log(err)
      }
      console.log('写入成功')
    })
  })
}

// 命令行接口
const readLine = require('readline')
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', input => {
  const [op, key, value] = input.split(' ')
  if (op === 'get') {
    get(key)
  } else if (op === 'set') {
    set(key, value)
  } else if (op === 'quit') {
    rl.close()
  } else {
    console.log('没有该操作')
  }
})
