async function test() {
  const { MongoClient: MongoDb } = require('mongodb')

  // 创建客户端
  const client = new MongoDb('mongodb://localhost:27017', {
    useNewUrlParser: true
  })

  // 创建连接
  let ret
  ret = await client.connect()
  // console.log('connect', ret)

  // 数据库
  const db = client.db('test')
  // 表名
  const fruits = db.collection('fruits')

  // 添加文档（数据）
  // ret = fruits.insertOne({ name: '芒果', price: 20.1 })
  // console.log('insert', JSON.stringify(ret))

  // 查询数据(一条数据)
  ret = await fruits.findOne()
  // console.log('findOne', ret)

  // 更新数据(第一个条满足的数据)
  // ret = await fruits.updateOne(
  //   { name: '芒果' }, // 查询条件
  //   {
  //     $set: {
  //       // 更新操作
  //       name: '苹果'
  //     }
  //   }
  // )

  // 删除（一条）
  ret = await fruits.deleteOne({ name: '芒果' })
  console.log('deleteOne', JSON.stringify(ret))

  // 删除（多条）
  // ret = await fruits.deleteMany()
  // console.log('deleteMany', ret)
}

// test()
