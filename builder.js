
const fs = require('fs-extra');
const moment = require('moment');
const rp = require('request-promise');

const tasks = require('./tasks.js');

const _HOST = 'http://127.0.0.1:3000/';
const _PUBLIC = './public';
const _PUBLIC_BK = './public.bk';
const _NOTE = _PUBLIC + '/note.md';

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
            if(html.indexOf('_ERRORPAGE_') == -1)
                console.log('\x1b[32m', 'OK \x1b[37m Page:', task.page);
            else
                console.log('\x1b[31m', 'ERR \x1b[37m Page:', task.page);
            return Promise.resolve();
        }));
        await fs.appendFile(_NOTE, 'Build at ' + moment().format('YYYY/MM/DD HH:mm'));
        console.log('Total File: %s, build success\n', tasks.length);
    } catch (err) {
        throw err;
    }
}

builder();

