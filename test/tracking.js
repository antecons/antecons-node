'use strict';

const Antecons = require('../lib/antecons'),
  nock = require('nock'),
  expect = require('chai').expect;

describe('Tracking', () => {
  let antecons;
  const tracking = {
    tracking_type: 'click',
    page_item: 'beer',
    referral_item: 'soda'
  };

  beforeEach(() => {
    antecons = new Antecons({ apiKey: 'abc', apiSecret: 'def' });
  });

  afterEach(() => nock.cleanAll());

  it('should add a tracking object', done => {
    const mock = nock('https://api.antecons.net')
      .post('/datasource/test/tracking', tracking)
      .reply(201);

    antecons.tracking.add('test', tracking, (err, res) => {
      if (err) return done(err);
      mock.done();
      done();
    });
  });
});
