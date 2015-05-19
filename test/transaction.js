'use strict';

var Antecons = require('../lib/antecons'),
    nock = require('nock'),
    expect = require('chai').expect;

describe('Transaction', function() {
  var antecons;
  var transaction = {
    source: 'o',
    transaction_items: ['a', 'b', 'c']
  };

  beforeEach(function() {
    antecons = Antecons({ apiKey: 'abc', apiSecret: 'def' });
  });

  afterEach(function() {
    nock.cleanAll();
  });

  it('should return a list of transactions', function(done) {
    var mock = nock('https://api.antecons.net')
      .get('/datasource/test/transaction?page=1&page_size=10')
      .reply(200, [transaction]);

    antecons.transaction.list('test', 1, 10, function(err, res) {
      if (err) return done(err);
      mock.done();
      expect(res).to.deep.equal([transaction]);
      done();
    });
  });

  it('should add a transaction', function(done) {
    var mock = nock('https://api.antecons.net')
      .post('/datasource/test/transaction', transaction)
      .reply(201);

    antecons.transaction.add('test', transaction, function(err, res) {
      if (err) return done(err);
      mock.done();
      done();
    });
  });
});
