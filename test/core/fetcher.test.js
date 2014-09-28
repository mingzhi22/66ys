var expect = require("chai").expect,
    Fetcher = require("../../core/fetcher.js");

describe('测试抓取器', function() {
    var fetcher = new Fetcher(),
        pageNum = Math.floor(Math.random() * 30);

    this.timeout(5000);

    it('抓取第1页视频列表', function(done) {
        fetcher.getMovieList(function(data) {
            expect(data).to.be.a('array');
            done();
        })
    });

    it('抓取第'+ pageNum +'页视频列表', function(done) {
        fetcher.getMovieList(pageNum, function(data) {
            expect(data).to.be.a('array');
            done();
        })
    });

    it('抓取视频下载链接', function(done) {
        fetcher.getDownloadLink('http://www.66ys.cc/1080p/20140606/29000.htm', function(data) {
            expect(data).to.be.a('array');
            expect(data[0].name).to.be.a('string');
            expect(data[0].url).to.be.a('string');
            done();
        });
    });
});
