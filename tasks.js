
let data = require('./data');

class task {
    constructor(view, name, data = {}) {
        this.view = view;
        this.name = name || view;
        this.data = typeof data === 'function' ? data() : data;
    }
}

let tasks = [

];