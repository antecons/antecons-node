'use strict';

const Antecons = require('../lib/antecons'),
    Resource = require('../lib/resource'),
    nock = require('nock'),
    expect = require('chai').expect;

describe('Constructor', () => {
  const configErr = 'Antecons module needs a configuration object.';
  const keyError = 'apiKey or apiSecret missing from Antecons configuration';

  it('should throw and error when config is missing', () => {
    const fails = () => {
      new Antecons();
    };
    expect(fails).to.throw(configErr);
  });

  it('should throw and error when config is null', () => {
    const fails = () => {
      new Antecons(null);
    };
    expect(fails).to.throw(configErr);
  });

  it('should throw and error when config is missing api key and seceret', () => {
    const fails = () => {
      new Antecons({});
    };
    expect(fails).to.throw(keyError);
  });

  it('should throw and error when config is missing api key', () => {
    const fails = () => {
      new Antecons({ apiSecret: 'abcd' });
    };
    expect(fails).to.throw(keyError);
  });

  it('should throw and error when config is missing api secret', () => {
    const fails = () => {
      new Antecons({ apiKey: 'abcd' });
    };
    expect(fails).to.throw(keyError);
  });

  it('should prepare the resources', () => {
    const antecons = new Antecons({ apiKey: 'abc', apiSecret: 'def' });
    expect(antecons.datasource).to.be.instanceof(Resource);
    expect(antecons.product).to.be.instanceof(Resource);
    expect(antecons.suggestion).to.be.instanceof(Resource);
    expect(antecons.transaction).to.be.instanceof(Resource);
    expect(antecons.statistic).to.be.instanceof(Resource);
    expect(antecons.tracking).to.be.instanceof(Resource);
  });
});
