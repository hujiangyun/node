const express = require('express')
const app = express()
const path = require('path')
const mogon = require('./models/db')

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'))
})

app.get('/api/list', async (req, res) => {
  // 取出response中query的参数
  const { num, page } = req.query
  // 连接fruits表
  const col = mogon.col('fruits')
  // 查找所有数据，并算出总数
  const total = await col.find().count()
  const fruits = await col
    .find() // find：查找
    .skip((page - 1) * num) // skip：跳跃（进入指定的页数）
    .limit(Number(num)) // limit：查找, skip：跳跃（进入指定的页数）
    .toArray() // 将结果变成数组
  // 将数据返回给前端
  res.json({ ok: 1, data: { fruits, pagination: { total, page } } })
})

app.listen(3000)
