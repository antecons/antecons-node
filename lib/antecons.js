'use strict';

const https = require('https');

const resources = {
  Datasource: require('./resources/datasource'),
  Product: require('./resources/product'),
  Transaction: require('./resources/transaction'),
  Suggestion: require('./resources/suggestion'),
  Tracking: require('./resources/tracking'),
  Statistic: require('./resources/statistic'),
};

class Antecons {
  constructor(config) {
    if (!config) {
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
    this._prepareResources();
  }

  _request(endpoint, method, data, callback) {
    const dataStr = data ? JSON.stringify(data) : '';
    const headers = {
      'User-Agent': this.userAgent,
      'Authorization': this.config.auth,
      'Accept': 'application/json'
    };
    method = (method || 'GET').toUpperCase();

    if (method === 'POST' || method === 'PUT') {
      headers['Content-Length'] = new Buffer(dataStr).length;
      headers['Content-Type'] = 'application/json';
    }

    const request = https.request({
      hostname: this.baseUrl,
      method: method,
      path: endpoint,
      headers: headers
    });

    request.on('response', resp => {
      this.log('Status: ' + resp.statusCode);
      this.log('Headers: ' + JSON.stringify(resp.headers));

      resp.setEncoding('utf8');

      let respBody = '';

      resp.on('data', chunk => {
        respBody += chunk;
      });

      resp.on('end', () => {
        this.log('Data: ' + respBody);

        if (!callback) return;

        if (!respBody) {
          return callback();
        }

        try {
          const result = JSON.parse(respBody);
          return callback(null, result);
        } catch(e) {
          this.log('Parsing error: ' + e);
        }
      });
    });

    request.on('error', err => {
      this.log('Request error: ' + err);
      if (callback) callback(err, null);
    });

    if (dataStr) request.write(dataStr);

    request.end();
  };

  _prepareResources() {
    for (let name in resources) {
      this[name.toLowerCase()] = new resources[name](this);
    }
  };

  log(msg) {
    if (this.config.debug) console.log(msg);
  }
}

module.exports = Antecons;
