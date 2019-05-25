const fn = async () => {
  //sequelize 使用对象操作数据库(封装了sql语句)
  const Sequelize = require('sequelize')

  // 创建中间件实例：数据库，登录名，密码，options
  const sequelize = new Sequelize('kaikeba', 'root', 'example', {
    host: 'localhost', // 域名
    dialect: 'mysql', // 语言(方言)
    operatorsAliases: false
  })

  // 定义模型(数据模型)当前需要的数据结构
  const Fruit = sequelize.define(
    'Fruit',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          // 并不是存入数据库中的值
          // get函数，可以动态计算数值，相当于vue中computed函数
          const fName = this.getDataValue('name') // 获取数据库中的字段值 -- name
          const price = this.getDataValue('price')
          const stock = this.getDataValue('stock')
          // return `${fName}(价格：￥${price}库存：${stock}kg)`
          return fName
        }
      },
      price: { type: Sequelize.FLOAT, allowNull: true },
      stock: { type: Sequelize.INTEGER, defaultValue: 0 }
    },
    {
      getterMethods: {
        amount() {
          return this.getDataValue('stock') + 'kg'
        }
      },
      setterMethods: {
        amount(val) {
          // val 设置amount时的值
          const idx = val.indexOf('kg')
          const v = val.slice(0, idx)
          this.setDataValue('stock', v)
        }
      }
      // timestamps: false // 去掉事件戳
    }
  )

  // 添加类方法
  Fruit.clasify = f => {
    const fruits = ['香蕉', '芒果', '椰子']
    return fruits.includes(f) ? '热带水果' : '其它水果'
  }

  // 使用类方法
  // const fruits = ['香蕉', '苹果']
  // fruits.forEach(f => console.log(f + '是' + Fruit.clasify(f)))

  // 添加实例方法
  Fruit.prototype.totalPrice = function(count) {
    return (this.price * count).toFixed(2)
  }

  // 使用实例方法
  Fruit.findAll().then(fruits => {
    const [f] = fruits
    // console.log(f)
    // console.log(f.stock)
    // console.log(`购买5kg${f.name},需要￥${f.totalPrice(5)}`)
  })

  // 查询表中所有的stock == 150的数据
  // Fruit.findAll({ where: { stock: 150 } }).then(fruits => {})

  // 查询表中第一个的stock == 150的数据, 相当于数组中的indexOf选项
  // Fruit.findOne({ where: { stock: 150 } }).then(fruits => {
  //   // 如果没有则为null
  //   // console.log(fruits.get())
  // })

  // 查询所有数据中第一条数据的name
  // Fruit.findOne({ attributes: ['name'] }).then(fruits => {
  //   console.log(fruits.get())
  // })

  // sync同步
  // force 重置
  // 同步数据库，force: true则会删除已存在表
  let ret = await Fruit.sync({ force: false })
  // console.log('ret:', ret)

  // 添加
  // ret = await Fruit.create({
  //   name: 'banana',
  //   price: 4.0
  // })
  // console.log(ret)

  // 查询(所有)
  // ret = await Fruit.findAll()
  // Fruit.findAll().then(fruits => {
  //   console.log(JSON.stringify(fruits))
  //   fruits[0].amount = '150kg' // 触发sequelize.define中option的amount的getter方法进行替换操作
  //   fruits[0].save() // 保存fruits[0]的数据
  // })
  // console.log('findall', JSON.stringify(ret))
  // console.log('amount', ret[0].amount)
}
fn()
