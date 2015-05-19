'use strict';

var Antecons = require('../lib/antecons'),
    nock = require('nock'),
    expect = require('chai').expect;

describe('Tracking', function() {
  var antecons;
  var tracking = {
    tracking_type: 'click',
    page_item: 'beer',
    referral_item: 'soda'
  };

  beforeEach(function() {
    antecons = Antecons({ apiKey: 'abc', apiSecret: 'def' });
  });

  afterEach(function() {
    nock.cleanAll();
  });

  it('should add a tracking object', function(done) {
    var mock = nock('https://api.antecons.net')
      .post('/datasource/test/tracking', tracking)
      .reply(201);

    antecons.tracking.add('test', tracking, function(err, res) {
      if (err) return done(err);
      mock.done();
      done();
    });
  });
});
