
var fs = require('fs-extra');
var moment = require('moment');

const _SASS_FOLDER = './dist/sass/';
const _DB = './dist/sass/db.json';

async function syncSass() {
    try {
        let db = await fs.readJSON(_DB);
        let files = await fs.readdir(_SASS_FOLDER);
        files.filter( f => f.indexOf('.sass') != -1 )
             .forEach( async function(name) {
                let path = _SASS_FOLDER + name;
                let info = await fs.stat(path);
                if( 
                    isDiffTime(db[name], info.mtime) ||
                    Object.keys(db).indexOf(name) == -1
                ) {
                    await buildCSS(path);
                }
                db[name] = info.mtime;
             });
        await fs.remove(_DB);
        await fs.appendFile(_DB, JSON.stringify(db));
    } catch (err) {
        throw err;
    }
}

function buildCSS(sass) {
    try {
        let css = sass.replace(/sass/g, 'css');
        console.log('\x1b[32m','UPDATE \x1b[37m CSS : ', sass, ' -> ', css);
        return Promise.resolve();    
    } catch (err) {
        return Promise.reject(err);
    }
}

function isDiffTime(t1, t2) {
    return moment(t1).unix() != moment(t2).unix();
}

syncSass();