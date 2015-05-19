'use strict';

var Antecons = require('../lib/antecons'),
    nock = require('nock'),
    expect = require('chai').expect;

describe('Product', function() {
  var antecons;
  var product = { product_id: 'beer' };

  beforeEach(function() {
    antecons = Antecons({ apiKey: 'abc', apiSecret: 'def' });
  });

  afterEach(function() {
    nock.cleanAll();
  });

  it('should return a list of products', function(done) {
    var mock = nock('https://api.antecons.net')
      .get('/datasource/test/product?page=1&page_size=10')
      .reply(200, [product]);

    antecons.product.list('test', 1, 10, function(err, res) {
      if (err) return done(err);
      mock.done();
      expect(res).to.deep.equal([product]);
      done();
    });
  });

  it('should return a single product', function(done) {
    var mock = nock('https://api.antecons.net')
      .get('/datasource/test/product/beer')
      .reply(200, product);

    antecons.product.single('test', 'beer', function(err, res) {
      if (err) return done(err);
      mock.done();
      expect(res).to.deep.equal(product);
      done();
    });
  });

  it('should delete a product', function(done) {
    var mock = nock('https://api.antecons.net')
      .delete('/datasource/test/product/beer')
      .reply(204);

    antecons.product.delete('test', 'beer', function(err, res) {
      if (err) return done(err);
      mock.done();
      done();
    });
  });

  it('should add a product', function(done) {
    var mock = nock('https://api.antecons.net')
      .post('/datasource/test/product', product)
      .reply(201);

    antecons.product.add('test', product , function(err, res) {
      if (err) return done(err);
      mock.done();
      done();
    });
  });
});
