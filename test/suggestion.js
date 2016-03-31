'use strict';

const Antecons = require('../lib/antecons'),
  nock = require('nock'),
  expect = require('chai').expect;

describe('Suggestion', () => {
  let antecons;
  const suggestion = {
    priority: 1,
    suggestion:  {
      id: 'soda',
      full: {
        product_id: 'soda',
        title: 'Soda'
      }
    }
  };

  beforeEach(() => {
    antecons = new Antecons({ apiKey: 'abc', apiSecret: 'def' });
  });

  afterEach(() => nock.cleanAll());

  it('should return a list of suggestions', () => {
    const mock = nock('https://api.antecons.net')
      .get('/datasource/test/suggestion?for=product&for_id=beer&limit=10&full=true&strong_only=true')
      .reply(201, [suggestion]);

    return antecons.suggestion.list('test', 'product', 'beer', 10, true, true)
      .then(res => {
        expect(res).to.deep.equal([suggestion]);
        mock.done();
      });
  });

  it('should return a list of product suggestions', () => {
    const mock = nock('https://api.antecons.net')
      .get('/datasource/test/suggestion?for=product&for_id=beer&limit=10&full=true')
      .reply(201, [suggestion]);

    return antecons.suggestion.products('test', 'beer', 10)
      .then(res => {
        expect(res).to.deep.equal([suggestion]);
        mock.done();
      });
  });

  it('should support a false url param before a true one', () => {
    const mock = nock('https://api.antecons.net')
      .get('/datasource/test/suggestion?for=product&for_id=beer&limit=10&full=&strong_only=true')
      .reply(201, [suggestion]);

    return antecons.suggestion.list('test', 'product', 'beer', 10, false, true)
      .then(res => mock.done());
  });
});
