"use strict"

var parseMovieList = require('./parser.js').parseMovieList,
    parseDownloadLink = require('./parser.js').parseDownloadLink,
    http = require('http'),
    iconv = require('iconv-lite');

function Fetcher() {
    this._res = '1080';
    this._origin = 'http://www.dygang.com';
}

Fetcher.prototype._getListPageURL = function(pageNum) {
    var pageNum = parseInt(pageNum, 10), url;

    if(!pageNum) {
        pageNum = 1;
    }

    if(pageNum === 1) {
        // http://www.66ys.cc/1080p/
        url = this._origin + '/' + this._res + 'p/';
    } else {
        // http://www.66ys.cc/1080p/index_2.htm
        url = this._origin + '/' + this._res + 'p/index_' + pageNum + '.htm';
    }

    return url;
};

Fetcher.prototype.getMovieList = function(pageNum, callback) {
    if(typeof pageNum === 'function') {
        callback = pageNum;
        pageNum = 1;
    }

    if(typeof callback !== 'function') {
        throw new Error('回调函数类型错误');
    }

    var url = this._getListPageURL(pageNum);

    http.get(url, function(res) {
        var buffers = [], size = 0;

        res.on('data', function(buffer) {
            buffers.push(buffer);
            size += buffer.length;
        });

        res.on('end', function() {
            var buffer = new Buffer(size), pos = 0,
                movieList;

            for(var i = 0, l = buffers.length; i < l; i++) {
                buffers[i].copy(buffer, pos);
                pos += buffers[i].length;
            }

            movieList = parseMovieList(iconv.decode(buffer, 'GBK'));
            callback(movieList);
        });

    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
};

Fetcher.prototype.getDownloadLink = function(url, callback) {
    if(typeof callback !== 'function') {
        throw new Error('回调函数类型错误');
    }

    http.get(url, function(res) {
        var buffers = [], size = 0;

        res.on('data', function(buffer) {
            buffers.push(buffer);
            size += buffer.length;
        });

        res.on('end', function() {
            var buffer = new Buffer(size), pos = 0,
                linkList;

            for(var i = 0, l = buffers.length; i < l; i++) {
                buffers[i].copy(buffer, pos);
                pos += buffers[i].length;
            }

            linkList = parseDownloadLink(iconv.decode(buffer, 'GBK'));
            callback(linkList);
        });

    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
};

module.exports = Fetcher;
