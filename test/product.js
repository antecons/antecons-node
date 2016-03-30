'use strict';

const Antecons = require('../lib/antecons'),
  nock = require('nock'),
  expect = require('chai').expect;

describe('Product', () => {
  let antecons;
  const product = { product_id: 'beer' };

  beforeEach(() => {
    antecons = new Antecons({ apiKey: 'abc', apiSecret: 'def' });
  });

  afterEach(() => nock.cleanAll());

  it('should return a list of products', done => {
    const mock = nock('https://api.antecons.net')
      .get('/datasource/test/product?page=1&page_size=10')
      .reply(200, [product]);

    antecons.product.list('test', 1, 10, (err, res) => {
      if (err) return done(err);
      mock.done();
      expect(res).to.deep.equal([product]);
      done();
    });
  });

  it('should return a single product', done => {
    const mock = nock('https://api.antecons.net')
      .get('/datasource/test/product/beer')
      .reply(200, product);

    antecons.product.single('test', 'beer', (err, res) => {
      if (err) return done(err);
      mock.done();
      expect(res).to.deep.equal(product);
      done();
    });
  });

  it('should delete a product', done => {
    const mock = nock('https://api.antecons.net')
      .delete('/datasource/test/product/beer')
      .reply(204);

    antecons.product.delete('test', 'beer', (err, res) => {
      if (err) return done(err);
      mock.done();
      done();
    });
  });

  it('should add a product', done => {
    const mock = nock('https://api.antecons.net')
      .post('/datasource/test/product', product)
      .reply(201);

    antecons.product.add('test', product , (err, res) => {
      if (err) return done(err);
      mock.done();
      done();
    });
  });
});
