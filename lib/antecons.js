'use strict';

function Antecons(config) {

    if (!(this instanceof Antecons))
        return new Antecons(config);

    if (typeof config === 'undefined' || !config) {
        throw new Error('Antecons module needs a configuration object.');
    }

    this.baseUrl = 'api.antecons.net';
    this.apiVersion = '0.1';
    this.userAgent = 'node-antecons/' + this.apiVersion;

    this.config = config;
    this.config.auth = 'Basic ' + new Buffer(this.config.apiKey + ':' +
                                             this.config.apiSecret)
                                             .toString('base64');
}

Antecons.prototype.makeRequest = function(endpoint, method, data, callback) {

    var https = require('https'),
        dataStr = JSON.stringify(data),
        options = {
            hostname: this.baseUrl,
            method: method,
            path: endpoint,
            headers: {
                'User-Agent': this.userAgent,
                'Authorization': this.config.auth,
                'Accept': 'application/json'
            }
        },
        self = this;

    if (options.method === 'POST') {
        options.headers['Content-Length'] = new Buffer(dataStr).length;
        options.headers['Content-Type'] = 'application/json';
    }

    var request = https.request(options, function(resp) {
        self.log('Status: ' + resp.statusCode);
        self.log('Headers: ' + JSON.stringify(resp.headers));

        resp.setEncoding('utf8');

        var respBody = '';

        resp.on('data', function(chunk) {
            self.log('Chunk: ' + chunk);
            respBody += chunk;
        });

        resp.on('end', function() {
            var result = JSON.parse(respBody);
            callback(result);
        });
    });

    request.on('error', function(e) {
        self.log('Request error: ' + e);
        callback(e);
    });

    if (options.method === 'POST')
        request.write(dataStr);

    request.end();
};

Antecons.prototype.get = function(endpoint, data, callback) {
    this.makeRequest(endpoint, 'GET', data, callback);
};

Antecons.prototype.post = function(endpoint, data, callback) {
    this.makeRequest(endpoint, 'POST', data, callback);
};

Antecons.prototype.log = function(msg) {
    if (this.config.debug) {
        console.log(msg);
    }
};

module.exports = Antecons;
