'use strict';

const Antecons = require('../lib/antecons'),
    nock = require('nock'),
    expect = require('chai').expect;

describe('Transaction', () => {
  let antecons;
  const transaction = {
    source: 'o',
    transaction_items: ['a', 'b', 'c']
  };

  beforeEach(() => {
    antecons = new Antecons({ apiKey: 'abc', apiSecret: 'def' });
  });

  afterEach(() => nock.cleanAll());

  it('should return a list of transactions', done => {
    const mock = nock('https://api.antecons.net')
      .get('/datasource/test/transaction?page=1&page_size=10')
      .reply(200, [transaction]);

    antecons.transaction.list('test', 1, 10, (err, res) => {
      if (err) return done(err);
      mock.done();
      expect(res).to.deep.equal([transaction]);
      done();
    });
  });

  it('should add a transaction', done => {
    const mock = nock('https://api.antecons.net')
      .post('/datasource/test/transaction', transaction)
      .reply(201);

    antecons.transaction.add('test', transaction, (err, res) => {
      if (err) return done(err);
      mock.done();
      done();
    });
  });
});
