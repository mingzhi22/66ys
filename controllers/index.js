/*var fetcher = new (require('../core/fetcher.js')),
    MovieItem = require('../views/movie-item.js'),
    movieContainer = document.getElementById('movies'),
    pageNum = 1;

function handler(movies) {
    if(movies && movies.length > 0) {
        movies.forEach(function(movie) {
            var item = new MovieItem(movie);

            item.on('detail', function(e) {
                fetcher.getDownloadLink(e.data.url, function(linkList) {
                    linkList.forEach(function(link) {
                        global.window.alert(link.name + ': ' + link.url);
                    });
                });
            });

            movieContainer.appendChild(item.dom);
        });
        pageNum++;
    }
}

fetcher.getMovieList(pageNum, handler);

document.getElementById('btn_load_more').addEventListener('click', function() {
    fetcher.getMovieList(pageNum, handler);
});*/

var fetcher = new (require('../core/fetcher.js')),
    movies = [],
    movieList = $('#movie_list')[0],
    movieDetailDialog = $('#movie_detail_dialog')[0],
    pageNum = 1,
    self = this;

movieList.addEventListener('core-activate', function(e) {
    var url = e.detail.item.getAttribute('data-url');

    movieDetailDialog.heading = '资料读取中...';
    movieDetailDialog.opened = true;
    movieDetailDialog.data = null;

    fetcher.getDownloadLink(url, function(linkList) {
        if(linkList && linkList.length !== 0) {
            if(movieDetailDialog.opened) {
                movieDetailDialog.heading = '影视详情';
                movieDetailDialog.data = linkList;
            }
        } else {
            movieDetailDialog.opened = false;
        }
    });
});

function handler(_movies) {
    if(_movies && _movies.length > 0) {
        movies = movies.concat(_movies);
        movieList.data = movies;
        pageNum++;
    }
}

fetcher.getMovieList(pageNum, handler);

$('#btn_load_more').on('click', function() {
    fetcher.getMovieList(pageNum, handler);
});
