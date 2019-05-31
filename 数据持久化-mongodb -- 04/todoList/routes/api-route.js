const Todo = require('../models/todo')
module.exports = function(app) {
  // 获取所有的数据
  app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find({})
    res.json(todos)
  })

  app.post('/api/todos', async (req, res) => {
    const todos = await Todo.create({
      ...req.body
    })
    res.json(todos)
  })

  app.put('/api/todos', async (req, res) => {
    const { id, text, complete } = req.body
    const todos = await Todo.updateOne(
      { id: id },
      { $set: { text: text, complete: complete } }
    )
    res.json(todos)
  })

  app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params
    const todos = await Todo.deleteOne({ _id: id })
    res.json(todos)
  })
}
