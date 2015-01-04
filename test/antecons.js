var antecons = require('../lib/antecons.js'),
    nock = require('nock'),
    chai = require('chai'),
    expect = chai.expect,
    assert = require('assert');

describe('Constructor checks', function() {
    var configErr = /Antecons module needs a configuration object./;
    var keyError = /apiKey or apiSecret missing from Antecons configuration/;

    it('should throw and error when config is missing', function() {
        var fails = function() {
            antecons();
        };
        assert.throws(fails, configErr);
    });

    it('should throw and error when config is null', function() {
        var fails = function() {
            antecons(null);
        };
        expect(fails).to.throw(configErr);
        assert.throws(fails, configErr);
    });

    it('should throw and error when config is missing api key and seceret', function() {
        var fails = function() {
            antecons({});
        };
        assert.throws(fails, keyError);
    });

    it('should throw and error when config is missing api key', function() {
        var fails = function() {
            antecons({ apiSecret: 'abcd' });
        };
        assert.throws(fails, keyError);
    });

    it('should throw and error when config is missing api secret', function() {
        var fails = function() {
            antecons({ apiKey: 'abcd' });
        };
        assert.throws(fails, keyError);
    });

    it('should return instance of API with new keyword', function() {
        var Antecons = new antecons({ apiKey: 'abc', apiSecret: 'def' });
        expect(Antecons).to.be.instanceof(antecons);
    });

    it('should return instance of API without new keyword', function() {
        var Antecons = antecons({ apiKey: 'abc', apiSecret: 'def' });
        expect(Antecons).to.be.instanceof(antecons);
    });
});
