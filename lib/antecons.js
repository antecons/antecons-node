'use strict';

var https = require('https');

var resources = {
  Datasource: require('./resources/datasource')
};

function Antecons(config) {

  if (!(this instanceof Antecons))
    return new Antecons(config);

  if (typeof config === 'undefined' || !config) {
    throw new Error('Antecons module needs a configuration object.');
  }

  if (!('apiKey' in config && 'apiSecret' in config)) {
    throw new Error('apiKey or apiSecret missing from Antecons configuration');
  }

  this.baseUrl = 'api.antecons.net';
  this.packageVersion = require('../package.json').version;
  this.userAgent = 'node-antecons/' + this.packageVersion;

  this.config = config;
  this.config.auth = 'Basic ' + new Buffer(this.config.apiKey + ':' +
                                           this.config.apiSecret)
                                          .toString('base64');
  this._prepareResources()
}

Antecons.prototype._request = function(endpoint, method, data, callback) {
  var dataStr = data ? JSON.stringify(data) : '',
      method = (method || 'GET').toUpperCase(),
      headers = {
        'User-Agent': this.userAgent,
        'Authorization': this.config.auth,
        'Accept': 'application/json'
      },
      self = this;

  if (method === 'POST' || method === 'PUT') {
    headers['Content-Length'] = new Buffer(dataStr).length;
    headers['Content-Type'] = 'application/json';
  }

  var request = https.request({
    hostname: self.baseUrl,
      method: method,
      path: endpoint,
      headers: headers
  });

  request.on('response', function(resp) {
    self.log('Status: ' + resp.statusCode);
    self.log('Headers: ' + JSON.stringify(resp.headers));

    resp.setEncoding('utf8');

    var respBody = '';

    resp.on('data', function(chunk) {
      respBody += chunk;
    });

    resp.on('end', function() {
      self.log('Data: ' + respBody);
      var result = JSON.parse(respBody);
      if (callback) {
        callback(null, result);
      }
    });
  });

  request.on('error', function(e) {
    self.log('Request error: ' + e);
    if (callback) {
      callback(e, null);
    }
  });

  if (dataStr) {
    request.write(dataStr);
  }

  request.end();
};

Antecons.prototype._prepareResources = function() {
  for (var name in resources) {
    this[name.toLowerCase()] = new resources[name](this);
  }
};

Antecons.prototype.log = function(msg) {
  if (this.config.debug) {
    console.log(msg);
  }
};

module.exports = Antecons;
