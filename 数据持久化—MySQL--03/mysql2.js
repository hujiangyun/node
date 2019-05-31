//
const testFn = async () => {
  // mysql数据库 -- 返回的都是Promise函数
  const mysql = require('mysql2/promise')
  // 连接数据库配置
  const cfg = {
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'kaikeba'
  }
  // create connection 建立连接
  const connection = await mysql.createConnection(cfg)

  // sql语句 --- 创建表
  // let ret = await connection.execute(`
  //     CREATE TABLE IF NOT EXISTS test (
  //       id INT NOT NULL AUTO_INCREMENT,
  //       message VARCHAR(45) NULL,
  //     PRIMARY KEY (id)
  //     )
  //   `)
  // console.log('ret', ret)

  // 插入数据 （INSERT INTO添加至） test -- 表名， message -- 字段名称, VALUE中的？是为了添加参数
  // ret = await connection.execute(`INSERT INTO test(message) VALUE(?)`, ['abc'])
  // console.log('inset', ret)

  // 查询 SELECT * -- 查询test表的所有字段
  // fields 表结构
  const [rows, fields] = await connection.execute(`SELECT * FROM test`)
  console.log('select:', JSON.stringify(rows))
}
testFn()
