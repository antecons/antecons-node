'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  list: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}/transaction?page={page}&page_size={pageSize}',
    urlParams: ['datasourceId', 'page', 'pageSize']
  }),

  add: Resource.method({
    method: 'POST',
    path: '/datasource/{datasourceId}/transaction',
    urlParams: ['datasourceId']
  }),
});
