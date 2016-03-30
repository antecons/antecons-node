'use strict';

const Resource = require('../resource');

const resourceSpec = {
  list: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}/suggestion?for={forType}&for_id={forId}&limit={limit}&full={full}&strong_only={strongOnly}',
    urlParams: ['datasourceId', 'forType', 'forId', 'limit', 'full', 'strongOnly']
  }),

  products: Resource.method({
    method: 'GET',
    path: '/datasource/{datasourceId}/suggestion?for=product&for_id={forId}&limit={limit}&full=true',
    urlParams: ['datasourceId', 'forId', 'limit']
  }),
};

class Suggestion extends Resource {
  constructor(antecons) {
    super(antecons, resourceSpec);
  }
}

module.exports = Suggestion;
