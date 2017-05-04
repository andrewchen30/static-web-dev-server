let path = require('path');
let sass = require('node-sass');
let tasks = require('./tasks.js');
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

router.get('/css/:file', (req, res, next) => {
  let fileName = req.params.file;
  let filePath = path.join(__dirname + '/dist/sass', fileName.replace(/.css/, '.sass'));
  sass.render({
    file: filePath,
  }, (err, result) => {
    if(err) return console.log('\x1b[31m', err, '\x1b[37ms');
    res.contentType('text/css');
    res.send(result.css.toString());
  });
});

module.exports = router;
