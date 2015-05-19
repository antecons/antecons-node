'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  list: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}/suggestion?for={forType}&for_id={forId}&limit={limit}&full={full}',
    urlParams: ['datasourceId', 'forType', 'forId', 'limit', 'full']
  }),

  products: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}/suggestion?for=product&for_id={forId}&limit={limit}&full=true',
    urlParams: ['datasourceId', 'forId', 'limit']
  }),
});
