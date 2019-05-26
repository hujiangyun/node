// mongodb 中间件
const mongoose = require('mongoose')
// 1.连接
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })

const con = mongoose.connection

con.on('error', () => console.error('连接数据库失败'))

// 连接成功后
con.once('open', async () => {
  // 2.定义一个Schema 表Table
  const Schema = mongoose.Schema({
    category: String,
    name: String
  })

  // 3. 编译一个model,对应数据库中的复数，小写的表名（集合，Collection）
  const Model = mongoose.model('fruit', Schema)
  try {
    // 4. 建表成功,create返回一个Promise
    let r = await Model.create({
      category: '温带水果',
      name: '苹果',
      price: 5
    })
    console.log(`插入数据${r}`)

    // 5.查询,finde返回Query，实现了then和catch，可以当做Promise使用
    // 如果需要返回Promise，则调用其exec()方法
    r = await Model.find({ name: '苹果' })
    console.log(`查询数据${r}`)

    // 6.更新,updateOne返回Query
    r = await Model.updateOne({ name: '苹果' }, { $set: { name: '芒果' } })
    console.log(`更新数据${JSON.stringify(r)}`)

    // 7.删除，deleteOne返回Query
    r = await Model.deleteOne({ name: '土豆' })
    console.log(`删除数据${JSON.stringify(r)}`)
  } catch (error) {
    console.log(error)
  }
})
