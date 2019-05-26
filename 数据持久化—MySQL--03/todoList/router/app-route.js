const db = require('../models')
module.exports = function(app) {
  // 获取所有的数据
  app.get('/api/todos', async (req, res) => {
    const todos = await db.Todo.findAll({})
    res.json(todos)
  })

  app.post('/api/todos', async (req, res) => {
    const todos = await db.Todo.create({
      ...req.body
    })
    res.json(todos)
  })

  app.put('/api/todos', async (req, res) => {
    const { id, text, complete } = req.body
    const todos = await db.Todo.update(
      { text: text, complete: complete },
      { where: { id: id } }
    )
    res.json(todos)
  })

  app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params
    const todos = await db.Todo.destroy({ where: { id: id } })
    res.json(todos)
  })
}
