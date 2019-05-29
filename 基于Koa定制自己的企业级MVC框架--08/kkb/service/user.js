// 模拟异步方法
// const delay = (data, tick) =>
//   new Promise(resolve => {
//     setTimeout(() => {
//       resolve(data)
//     }, tick)
//   })

module.exports = {
  async getName(app) {
    const obj = await app.$model.user.findOne({ where: { id: 1 } })
    return JSON.stringify(obj)
  },
  getAge() {
    return 20
  }
}
