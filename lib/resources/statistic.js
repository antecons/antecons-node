'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  latestClicks: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}/stat/click/latest?limit={limit}',
    urlParams: ['datasourceId', 'limit']
  })
});
