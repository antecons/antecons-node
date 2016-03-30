'use strict';

const Antecons = require('../lib/antecons'),
  nock = require('nock'),
  expect = require('chai').expect;

describe('Datasource', () => {
  let antecons;
  const ds = { datasource_id: 'test' };

  beforeEach(() => {
    antecons = new Antecons({ apiKey: 'abc', apiSecret: 'def' });
  });

  afterEach(() => nock.cleanAll());

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

  it('should return a single of datasource', done => {
    const datasourceGet = nock('https://api.antecons.net')
      .get('/datasource/test')
      .reply(200, ds);

    antecons.datasource.single('test', (err, res) => {
      expect(res).to.deep.equal(ds);
      datasourceGet.done();
      done();
    });
  });

  it('should be able to add a single datasource', done => {
    const datasourceGet = nock('https://api.antecons.net')
      .post('/datasource')
      .reply(200, [ds]);

    antecons.datasource.add(ds, (err, res) => {
      expect(res).to.deep.equal([ds]);
      datasourceGet.done();
      done();
    });
  });

  it('should return http error when a datasource is not found', done => {
    const datasourceGet = nock('https://api.antecons.net')
      .get('/datasource/notfound')
      .reply(404, { code: 404 });

    antecons.datasource.single('notfound', (err, res) => {
      expect(res).to.have.property('code', 404);
      datasourceGet.done();
      done();
    });
  });
});
