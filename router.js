let fs = require('fs-extra');
let path = require('path');
let sass = require('node-sass');
let tasks = require('./tasks.js');
let express = require('express');

let router = express.Router();

let _COLOR_RED = '\x1b[31m';

router.get('/', (req, res, next) => {
  res.render('_index', {tasks});
});

router.get('/:page', (req, res, next) => {
  let task = tasks.filter( task => task.page == req.params.page)[0];
  // if(!task) return next();
  res.render(task.view, task.data);
});

module.exports = router;