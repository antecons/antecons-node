'use strict';

const Resource = require('../resource');

const resourceSpec = {
  latestClicks: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}/stat/click/latest?limit={limit}',
    urlParams: ['datasourceId', 'limit']
  })
};

class Stat extends Resource {
  constructor(antecons) {
    super(antecons, resourceSpec);
  }
}

module.exports = Stat;
