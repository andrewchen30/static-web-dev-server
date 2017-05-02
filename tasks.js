
let data = require('./data');

class task {
    constructor(page, view, data = {}) {
        this.page = page;
        this.view = view || page;
        this.data = typeof data === 'function' ? data() : data;
    }
}

let tasks = [
    new task('home', 'home', data.home),
];

module.exports = tasks;