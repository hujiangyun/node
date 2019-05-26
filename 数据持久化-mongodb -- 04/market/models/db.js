// 引入配置文件
const conf = require('./config')
// 两个异步方法串联(emit,on)
const EventEmitter = require('events').EventEmitter
const { MongoClient: MongoDb } = require('mongodb')

// 类
class Mongodb {
  constructor(conf) {
    this.conf = conf
    this.emiter = new EventEmitter()
    // useNewUrlParser防止兼容性
    this.client = new MongoDb(conf.url, { useNewUrlParser: true })
    // 创建连接
    this.client.connect(err => {
      if (err) throw err
      this.emiter.emit('connect')
      console.log('连接成功')
    })
  }

  col(colName, dbName = conf.dbName) {
    //连接数据库，表，dbName---数据库名，colName---表名
    return this.client.db(dbName).collection(colName)
  }

  once(event, cb) {
    this.emiter.once(event, cb)
  }
}

module.exports = new Mongodb(conf)
