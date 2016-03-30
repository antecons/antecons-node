'use strict';

const Resource = require('../resource');

const resourceSpec = {
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
};

class Transaction extends Resource {
  constructor(antecons) {
    super(antecons, resourceSpec);
  }
}

module.exports = Transaction;
