'use strict';

var Antecons = require('../lib/antecons'),
    Resource = require('../lib/resource'),
    nock = require('nock'),
    expect = require('chai').expect;

describe('Constructor', function() {
  var configErr = 'Antecons module needs a configuration object.';
  var keyError = 'apiKey or apiSecret missing from Antecons configuration';

  it('should throw and error when config is missing', function() {
    var fails = function() {
      Antecons();
    };
    expect(fails).to.throw(configErr);
  });

  it('should throw and error when config is null', function() {
    var fails = function() {
      Antecons(null);
    };
    expect(fails).to.throw(configErr);
  });

  it('should throw and error when config is missing api key and seceret', function() {
    var fails = function() {
      Antecons({});
    };
    expect(fails).to.throw(keyError);
  });

  it('should throw and error when config is missing api key', function() {
    var fails = function() {
      Antecons({ apiSecret: 'abcd' });
    };
    expect(fails).to.throw(keyError);
  });

  it('should throw and error when config is missing api secret', function() {
    var fails = function() {
      Antecons({ apiKey: 'abcd' });
    };
    expect(fails).to.throw(keyError);
  });

  it('should return instance of API with new keyword', function() {
    var antecons = new Antecons({ apiKey: 'abc', apiSecret: 'def' });
    expect(antecons).to.be.instanceof(Antecons);
  });

  it('should return instance of API without new keyword', function() {
    var antecons = Antecons({ apiKey: 'abc', apiSecret: 'def' });
    expect(antecons).to.be.instanceof(Antecons);
  });

  it('should prepare the resources', function() {
    var antecons = Antecons({ apiKey: 'abc', apiSecret: 'def' });
    expect(antecons.datasource).to.be.instanceof(Resource);
    expect(antecons.product).to.be.instanceof(Resource);
    expect(antecons.suggestion).to.be.instanceof(Resource);
    expect(antecons.transaction).to.be.instanceof(Resource);
    expect(antecons.statistic).to.be.instanceof(Resource);
    expect(antecons.tracking).to.be.instanceof(Resource);
  });
});
