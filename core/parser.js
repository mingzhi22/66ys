"use strict"

(function() {
    module.exports = {
        parseMovieList: function(html) {
            var lines = html.split('\n');

            lines = lines.filter(function(line) {
                return /classlinkclass/.test(line);
            });

            return lines.map(function(line) {
                var tmp = line.match(/href="(.*?)".*?>(.*?)<\/a>/);

                return {
                    url: tmp[1],
                    name: tmp[2]
                };
            });
        },

        parseDownloadLink: function(html) {
            var lines = html.split('\n');

            lines = lines.filter(function(line) {
                return /bgcolor="#(?:ddedfb|ffffbb)"/.test(line);
            });

            return lines.map(function(line) {
                var tmp = line.match(/href="(.*?)".*?>(.*?)<\/a>/);

                return {
                    url: tmp[1],
                    name: tmp[2]
                };
            });
        }
    };
}());
