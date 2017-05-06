let fs = require('fs');
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
  if(!task) return next();
  res.render(task.view, task.data);
});

router.get('/css/:file', (req, res, next) => {
  let fileName = req.params.file;
  let filePath = path.join(__dirname + '/dist/sass', fileName.replace(/.css/, '.sass'));
  let cssFilePath = filePath.replace(/sass/g, 'css');
  sass.render({
    file: filePath,
    outputStyle: 'compressed',
  }, (err, result) => {
    if(err) return console.log(_COLOR_RED, err, '\x1b[37ms');
    res.contentType('text/css');
    res.send(result.css.toString());
    fs.appendFile(cssFilePath, result.css, err => {
      if(err) throw err;
      console.log('\x1b[32m','update \x1b[37m css file: ', req.params.file);
    });
  });
});

module.exports = router;