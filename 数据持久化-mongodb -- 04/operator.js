// 查询操作符:提供多种方式定位数据库数据
//     比较$eq，$gt，$gte，$in
//     逻辑$and,$not,$nor,$or
//     模拟$regex，$text，$expr
//     元素$exists，$type
//     数组$all,$elemMatch,$size 地理空间$geoIntersects,$geoWithin,$near,$nearSphere
// 更新操作符:可以修改数据库数据或添加附加数据
//     字段相关:$set,$unset,$setOnInsert,$rename,$inc,$min,$max,$mul
//     数组相关:$,$[],$addToSet,$pull,$pop,$push,$pullAll
//     修改器，常结合数组操作符使用:$each,$position,$slice,$sort
// 聚合操作符:使用aggregate方法，使文档顺序通过管道阶段从而得到最终结果
//     聚合管道阶段:$group,$count,$sort,$skip,$limit,$project等
//     聚合管道操作符:$add,$avg,$sum等
const test = async () => {
  const { MongoClient: MongoDB } = require('mongodb')

  // 创建客户端
  const client = new MongoDB('mongodb://localhost:27017', {
    userNewUrlParser: true
  })
  let ret
  // 创建连接
  ret = await client.connect()
  // console.log('ret:', ret)
  const db = client.db('test')
  // // 地理空间$geoIntersects,$geoWithin,$near,$nearSphere
  // // 创建stations集合
  // const stations = db.collection("stations");
  // // 添加测试数据，执行一次即可
  // await stations.insertMany([
  //     { name: "天安门东", loc: [116.407851, 39.91408] },
  //     { name: "天安门西", loc: [116.398056, 39.913723] },
  //     { name: "王府井", loc: [116.417809, 39.91435] }
  // ]);
  // await stations.createIndex({ loc: "2dsphere" });
  // r = await stations.find({
  //     loc: {
  //         $nearSphere: {
  //             $geometry: {
  //                 type: "Point",
  //                 coordinates: [116.403847, 39.915526]
  //             },
  //             $maxDistance: 1000
  //         }
  //     }
  // }).toArray();
  // console.log("天安门附近地铁站", r);
  const col = db.collection('fruits')
  await col.find({ name: { $regex: /芒/ } })
  await col.createIndex({ name: 'text' }) // 验证文本搜索需首先对字段加索引
  ret = await col.find({ $text: { $search: '芒果' } }).toArray() // 按词搜索，单独字查询不出结果
  console.log('ret', ret)
  client.close()
}
