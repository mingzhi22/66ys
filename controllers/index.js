var Fetcher = require('../core/fetcher.js'),
    fetcher = new Fetcher(),
    MovieItem = require('../views/movie-item.js');

fetcher.getMovieList(function(movies) {
    movies.forEach(function(movie) {
        var item = new MovieItem(movie);

        item.on('detail', function(e) {
            fetcher.getDownloadLink(e.data.url, function(linkList) {
                console.debug(linkList);
            });
        });

        document.getElementById('movies').appendChild(item.dom);
    });
});
