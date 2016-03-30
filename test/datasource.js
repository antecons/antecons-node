'use strict';

var Antecons = require('../lib/antecons'),
    nock = require('nock'),
    expect = require('chai').expect;

describe('Datasource', function() {
  var antecons;
  var ds = { datasource_id: 'test' };

  beforeEach(function() {
    antecons = Antecons({ apiKey: 'abc', apiSecret: 'def' });
  });

  afterEach(function() {
    nock.cleanAll();
  });

  it('should return a list of datasources', done => {
    const datasourceGet = nock('https://api.antecons.net')
      .get('/datasource')
      .reply(200, [ds]);

    antecons.datasource.list((err, res) => {
      expect(res).to.deep.equal([ds]);
      datasourceGet.done();
      done();
    });
  });

  it('should _promise_ to return a list of datasources', () => {
    const datasourceGet = nock('https://api.antecons.net')
      .get('/datasource')
      .reply(200, [ds]);

    return antecons.datasource.list()
      .then(res => {
        expect(res).to.deep.equal([ds]);
        datasourceGet.done();
      });
  });

  it('should return a single of datasource', function(done) {
    var datasourceGet = nock('https://api.antecons.net')
      .get('/datasource/test')
      .reply(200, ds);

    antecons.datasource.single('test', function(err, res) {
      expect(res).to.deep.equal(ds);
      datasourceGet.done();
      done();
    });
  });

  it('should be able to add a single datasource', function(done) {
    var datasourceGet = nock('https://api.antecons.net')
      .post('/datasource')
      .reply(200, [ds]);

    antecons.datasource.add(ds, function(err, res) {
      expect(res).to.deep.equal([ds]);
      datasourceGet.done();
      done();
    });
  });

  it('should return http error when a datasource is not found', function(done) {
    var datasourceGet = nock('https://api.antecons.net')
      .get('/datasource/notfound')
      .reply(404, { code: 404 });

    antecons.datasource.single('notfound', function(err, res) {
      expect(res).to.have.property('code', 404);
      datasourceGet.done();
      done();
    });
  });
});
