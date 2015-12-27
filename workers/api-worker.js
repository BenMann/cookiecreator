var request = require('request'),
    config = require('../config/config'),
    api = config.apiPath;


/* =============================================
* POST register package
* @name: name of new package to create
* @url: url of new package to create
* =========================================== */
exports.registerPackage = function(name, url, callback) {
    var requestUrl = api + 'packages';

    request.post({
        url: requestUrl,
        timeout: config.timeout,
        json: true,
        body: {
            "name": name,
            "url": url
        }
    }, function (err, res) {
        // If there was an internal error (e.g. timeout)
        if (err) {
          return callback("Internal error creating package.");
        }

        // Duplicate
        if (res.statusCode === 403) {
          return callback(null, res.body);
          console.log('Duplicate package');
        }

        // Invalid format
        if (res.statusCode === 400) {
          return callback(null, res.body);
          console.log('Invalid URL format');
        }

        // Everything other than 201 is unknown
        if (res.statusCode !== 201) {
          return callback(null, "Unknown error creating package."+ res.statusCode + " - " + res.body);
          console.log('Unknown error: ' + res.statusCode + ' - ' + res.body);
        }

        callback(null, "Package " + name + " created with URL: " + url);
    });
};


