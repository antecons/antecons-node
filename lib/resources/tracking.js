'use strict';

const Resource = require('../resource');

const resourceSpec = {
  add: Resource.method({
    method: 'POST',
    path: '/datasource/{datasourceId}/tracking',
    urlParams: ['datasourceId']
  })
};

class Tracking extends Resource {
  constructor(antecons) {
    super(antecons, resourceSpec);
  }
}

module.exports = Tracking;
