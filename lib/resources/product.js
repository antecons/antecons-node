'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  list: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}/product?page={page}&page_size={pageSize}',
    urlParams: ['datasourceId', 'page', 'pageSize']
  }),

  single: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}/product/{productId}',
    urlParams: ['datasourceId', 'productId']
  }),

  add: Resource.method({
    method: 'POST',
    path: '/datasource/{datasourceId}/product',
    urlParams: ['datasourceId']
  }),

  delete: Resource.method({
    method: 'DELETE',
    path: '/datasource/{datasourceId}/product/{productId}',
    urlParams: ['datasourceId', 'productId']
  })
});
