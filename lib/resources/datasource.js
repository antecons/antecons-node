'use strict';

const Resource = require('../resource');

const resourceSpec = {
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

  remove: Resource.method({
    method: 'DELETE',
    path: '/datasource/{datasourceId}',
    urlParams: ['datasourceId']
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
    path: '/datasource/{datasourceId}/suggestion?for={forType}&for_id={forId}&limit={limit}&full={full}',
    urlParams: ['datasourceId', 'forType', 'forId', 'limit', 'full']
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
  }),

  deleteProduct: Resource.method({
    method: 'DELETE',
    path: '/datasource/{datasourceId}/product/{productId}',
    urlParams: ['datasourceId', 'productId']
  }),

  getProduct: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}/product/{productId}',
    urlParams: ['datasourceId', 'productId']
  }),

  addTracking: Resource.method({
    method: 'POST',
    path: '/datasource/{datasourceId}/tracking',
    urlParams: ['datasourceId']
  })
};

class Datasource extends Resource {
  constructor(antecons) {
    super(antecons, resourceSpec);
  }
}

module.exports = Datasource;
