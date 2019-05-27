const mongoose = require('mongoose')

// 1.连接
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })

const con = mongoose.connection
con.on('err', () => console.log('数据库连接失败'))
con.once('open', () => console.log('数据库连接成功'))
