let tasks = require('../tasks.js');
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/:page', function(req, res, next) {
  let task = tasks.filter( task => task.page == req.params.page)[0];
  res.render(task.view, task.data);
});

module.exports = router;
