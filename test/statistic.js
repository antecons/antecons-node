'use strict';

const Antecons = require('../lib/antecons'),
  nock = require('nock'),
  expect = require('chai').expect;

describe('Statistic', () => {
  let antecons;
  const latestClicks = [
    {
      clicks: 2,
      product_id: 'beer',
      referrals: []
    },
    {
      clicks: 0,
      product_id: 'soda',
      referrals: [
        { product_id: 'beer' },
        { product_id: 'beer' }
      ]
    }
  ];

  beforeEach(() => {
    antecons = new Antecons({ apiKey: 'abc', apiSecret: 'def' });
  });

  afterEach(() => nock.cleanAll());

  it('should get the latest clicks', done => {
    const mock = nock('https://api.antecons.net')
      .get('/datasource/test/stat/click/latest?limit=1000')
      .reply(200, latestClicks);

    antecons.statistic.latestClicks('test', 1000, (err, res) => {
      if (err) return done(err);
      expect(res).to.deep.equal(latestClicks);
      mock.done();
      done();
    });
  });
});
