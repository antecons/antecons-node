var antecons = require('../lib/antecons');
var Resource = require('../lib/resource');
var nock = require('nock');
var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');

describe('Constructor checks', function() {
  var configErr = 'Antecons module needs a configuration object.';
  var keyError = 'apiKey or apiSecret missing from Antecons configuration';

  it('should throw and error when config is missing', function() {
    var fails = function() {
      antecons();
    };
    expect(fails).to.throw(configErr);
  });

  it('should throw and error when config is null', function() {
    var fails = function() {
      antecons(null);
    };
    expect(fails).to.throw(configErr);
  });

  it('should throw and error when config is missing api key and seceret', function() {
    var fails = function() {
      antecons({});
    };
    expect(fails).to.throw(keyError);
  });

  it('should throw and error when config is missing api key', function() {
    var fails = function() {
      antecons({ apiSecret: 'abcd' });
    };
    expect(fails).to.throw(keyError);
  });

  it('should throw and error when config is missing api secret', function() {
    var fails = function() {
      antecons({ apiKey: 'abcd' });
    };
    expect(fails).to.throw(keyError);
  });

  it('should return instance of API with new keyword', function() {
    var Antecons = new antecons({ apiKey: 'abc', apiSecret: 'def' });
    expect(Antecons).to.be.instanceof(antecons);
  });

  it('should return instance of API without new keyword', function() {
    var Antecons = antecons({ apiKey: 'abc', apiSecret: 'def' });
    expect(Antecons).to.be.instanceof(antecons);
  });

  it('should prepare the resources', function() {
    var Antecons = antecons({ apiKey: 'abc', apiSecret: 'def' });
    expect(Antecons.datasource).to.be.instanceof(Resource);
  });
});

describe('Datasource methods', function() {
  var Antecons;
  var ds = { datasource_id: 'test' };

  beforeEach(function(done) {
    Antecons = antecons({ apiKey: 'abc', apiSecret: 'def' });
    done();
  });

  afterEach(function(done) {
    nock.cleanAll();
    done();
  });

  it('should return a list of datasources', function(done) {
    var datasourceGet = nock('https://api.antecons.net')
    .get('/datasource')
    .reply(200, [ds]);
  Antecons.datasource.list(function(err, res) {
    expect(res).to.deep.equal([ds]);
    done();
  });
  });

  it('should _promise_ to return a list of datasources', function(done) {
    var datasourceGet = nock('https://api.antecons.net')
    .get('/datasource')
    .reply(200, [ds]);
  Antecons.datasource.list()
    .then(function(res) {
      expect(res).to.deep.equal([ds]);
      done();
    });
  });

  it('should return a single of datasource', function(done) {
    var datasourceGet = nock('https://api.antecons.net')
    .get('/datasource/test')
    .reply(200, ds);
  Antecons.datasource.single('test', function(err, res) {
    expect(res).to.deep.equal(ds);
    done();
  });
  });

  it('should be able to add a single datasource', function(done) {
    var datasourceGet = nock('https://api.antecons.net')
    .post('/datasource')
    .reply(200, [ds]);
  Antecons.datasource.add(ds, function(err, res) {
    expect(res).to.deep.equal([ds]);
    done();
  });
  });

  it('should return http error when a datasource is not found', function(done) {
    var datasourceGet = nock('https://api.antecons.net')
    .get('/datasource/notfound')
    .reply(404, { code: 404 });
  Antecons.datasource.single('notfound', function(err, res) {
    expect(res).to.have.property('code', 404);
    done();
  });
  });
});
