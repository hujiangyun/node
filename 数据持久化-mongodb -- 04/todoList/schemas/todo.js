var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Todo = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    complete: {
      type: String,
      required: true
    }
  },
  { collection: 'todo' }
)
module.exports = Todo
