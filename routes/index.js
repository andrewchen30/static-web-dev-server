let tasks = require('../tasks.js');
let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
  res.render('_index', {tasks});
});

router.get('/:page', (req, res, next) => {
  let task = tasks.filter( task => task.page == req.params.page)[0];
  if(!task) return next();
  res.render(task.view, task.data);
});

module.exports = router;
