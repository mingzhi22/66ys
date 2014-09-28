(function() {
    "use strict"

    module.exports = {
        parseMovieList: function(html) {
            var lines = html.split('\n');

            lines = lines.filter(function(line) {
                return /classlinkclass/.test(line);
            });

            lines = lines.map(function(line) {
                var tmp = line.match(/href="(.*?)".*?>(.*?)<\/a>/);

                return {
                    url: tmp[1],
                    name: tmp[2].replace(/\[.*?\]/, '')
                };
            });

            return lines.filter(function(line) {
                return line != false;
            });
        },

        parseDownloadLink: function(html) {
            var lines = html.split('\n');

            lines = lines.filter(function(line) {
                return /bgcolor="#(?:ddedfb|ffffbb)"/.test(line);
            });

            lines = lines.map(function(line) {
                var tmp = line.match(/href="(.*?)".*?>(.*?)<\/a>/);

                if(tmp) {
                    return {
                        url: tmp[1],
                        name: tmp[2]
                    };
                } else {
                    return false;
                }
            });

            return lines.filter(function(line) {
                return line != false;
            });
        }
    };
}());
