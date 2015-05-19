'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  add: Resource.method({
    method: 'POST',
    path: '/datasource/{datasourceId}/tracking',
    urlParams: ['datasourceId']
  })
});
