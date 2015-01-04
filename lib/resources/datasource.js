'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  list: Resource.method({
    method: 'GET',
    path: '/datasource'
  }),

  single: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}',
    urlParams: ['datasourceId']
  }),

  add: Resource.method({
    method: 'POST',
    path: '/datasource'
  }),

  transactions: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}/transaction',
    urlParams: ['datasourceId']
  }),

  products: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}/product',
    urlParams: ['datasourceId']
  }),

  suggestions: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}/suggestion?for={forType}&for_id={forId}&limit={limit}',
    urlParams: ['datasourceId', 'forType', 'forId', 'limit']
  }),

  addTransaction: Resource.method({
    method: 'POST',
    path: '/datasource/{datasourceId}/transaction',
    urlParams: ['datasourceId']
  }),

  addProduct: Resource.method({
    method: 'POST',
    path: '/datasource/{datasourceId}/product',
    urlParams: ['datasourceId']
  })
});
