
const fs = require('fs-extra');
const tasks = require('./tasks.js');
const rp = require('request-promise');
const moment = require('moment');

const _HOST = 'http://127.0.0.1:3000/';
const _PUBLIC = './public';
const _PUBLIC_BK = './public.bk';

console.ok = function() {
    let args = [];
    let title = ['\x1b[32m', 'OK ', '\x1b[37m'];
    for (var key in arguments) {
        if (arguments.hasOwnProperty(key))
            args.push(arguments[key]);
    }
    console.log.apply(null, title.concat(args));
};

async function builder() {
    try {
        await fs.remove(_PUBLIC_BK);
        await fs.move(_PUBLIC, _PUBLIC_BK);
        await fs.mkdir(_PUBLIC);
        await Promise.all(tasks.map( async task => {
            let uri = _HOST + task.page;
            let file = _PUBLIC + '/' + task.page + '.html';
            let html = await rp({ uri });
            await fs.appendFile(file, html);
            console.ok('Page:', task.page);
            return Promise.resolve();
        }));
        await fs.appendFile(_PUBLIC + '/note.md', 'Build at ' + moment().format('YYYY/MM/DD HH:mm'));
        console.log('Total File: %s, build success\n', tasks.length);
    } catch (err) {
        throw err;
    }
}

builder();

