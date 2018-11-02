const express = require('express');
const router = express.Router();

// Todo Model
const Todo = require('../../models/Todo');


// @route POST api/todos
// @desc Create A Todo
// @access Public
router.post('/', (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    checkList: req.body.checkList,
    prio: req.body.prio,
    dueDate: req.body.dueDate,
    times: req.body.times
  });

/* old post
  newTodo.save(function(err, todo) {
    if(err) return res.status(500)
    res.status(200).json(todo)
  })
*/

  newTodo.save()
  .then(todo => res.status(200).json(todo))
  .catch(err => res.status(500).send("Unable to save to database"))

});


// @route GET api/todos
// @desc Read All Todos
// @access Public
router.get('/', (req, res) => {
  Todo.find()
  .sort({createdAt: -1})
  .then(todos => res.status(200).json(todos))
  .catch(err => res.status(500).send("Unable to get data from database"))
});


// @route DELETE api/todos
// @desc Delete A Todo
// @access Public
router.delete('/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => todo.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});


module.exports = router;
