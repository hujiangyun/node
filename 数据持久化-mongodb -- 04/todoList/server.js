const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// mongodb 中间件
const mongoose = require('mongoose')
// 1.连接
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true })
const con = mongoose.connection

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('./public'))

con.on('error', () => console.log('连接失败'))

require('./routes/api-route')(app)

con.on('open', () => {
  app.listen(PORT, () => {
    console.log(`App listen at ${PORT}`)
  })
})
