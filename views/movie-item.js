var microTemplate = require('../utils/micro-tmpl.js'),
    fs = require('fs'),
    path = require('path'),
    html = fs.readFileSync(path.join(__dirname, 'movie-item.html'), 'utf8'),
    tmpl = microTemplate(html),
    EE = require('events').EventEmitter;

function MenuItem(data) {
    this._data = data;
    this._init();
    this._bindEvent();
}

MenuItem.prototype = Object.create(EE.prototype);

MenuItem.prototype._init = function() {
    var fragment = global.window.document.createElement('template');

    fragment.innerHTML = tmpl(this._data);
    this.dom = fragment.content;
};

MenuItem.prototype._bindEvent = function() {
    var self = this;

    this.dom.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        self.emit('detail', {data: self._data});
    });
};

module.exports = MenuItem;
