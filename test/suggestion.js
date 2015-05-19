'use strict';

var Antecons = require('../lib/antecons'),
    nock = require('nock'),
    expect = require('chai').expect;

describe('Suggestion', function() {
  var antecons;
  var suggestion = {
    priority: 1,
    suggestion:  {
      id: 'soda',
      full: {
        product_id: 'soda',
        title: 'Soda'
      }
    }
  };

  beforeEach(function() {
    antecons = Antecons({ apiKey: 'abc', apiSecret: 'def' });
  });

  afterEach(function() {
    nock.cleanAll();
  });

  it('should return a list of suggestions', function(done) {
    var mock = nock('https://api.antecons.net')
      .get('/datasource/test/suggestion?for=product&for_id=beer&limit=10&full=true')
      .reply(201, [suggestion]);

    antecons.suggestion.list('test', 'product', 'beer', 10, true , function(err, res) {
      if (err) return done(err);
      expect(res).to.deep.equal([suggestion]);
      mock.done();
      done();
    });
  });

  it('should return a list of product suggestions', function(done) {
    var mock = nock('https://api.antecons.net')
      .get('/datasource/test/suggestion?for=product&for_id=beer&limit=10&full=true')
      .reply(201, [suggestion]);

    antecons.suggestion.products('test', 'beer', 10, function(err, res) {
      if (err) return done(err);
      expect(res).to.deep.equal([suggestion]);
      mock.done();
      done();
    });
  });

});
