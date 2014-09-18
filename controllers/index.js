var fetcher = new (require('../core/fetcher.js')),
    MovieItem = require('../views/movie-item.js'),
    movieContainer = document.getElementById('movies'),
    pageNum = 1;

function handler(movies) {
    if(movies && movies.length > 0) {
        movies.forEach(function(movie) {
            var item = new MovieItem(movie);

            item.on('detail', function(e) {
                fetcher.getDownloadLink(e.data.url, function(linkList) {
                    console.debug(linkList);
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
});
