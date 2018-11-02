const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  checkList: {
    type: [String]
  },
  dueDate: {
    type: String
  },
  prio: {
    type: String
  }
}, {timestamps: true});

module.exports = Todos = mongoose.model('todo', TodoSchema);
