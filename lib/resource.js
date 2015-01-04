/**
 * Methods for resources.
 *
 * Inspired by the Stripe API. MIT license.
 * Copyright (C) 2011 Ask Bjørn Hansen
 * Copyright (C) 2013 Stripe, Inc. (https://stripe.com)
 * See README for full license.
 */
'use strict';

var Q = require('q');
var utils = require('./utils');

Resource.extend = utils.protoExtend;
Resource.method = methodCreator;

function Resource(antecons) {
  this._antecons = antecons;
}

/**
 * Wraps the given callback in a deferred. The callback will be called out of
 * the promise context.
 */
function createDeferredCallback(callback) {
  var deferred = Q.defer();

  if (callback) {
    deferred.promise.then(function(res) {
      setTimeout(function() { callback(null, res); }, 0);
    }, function(err) {
      setTimeout(function() { callback(err, null); }, 0);
    });
  }

  return deferred;
}

/**
 * Create an API method from the given specification.
 */
function methodCreator(spec) {
  var urlCreator = utils.makeURLInterpolator(spec.path || '');
  var requestMethod = (spec.method || 'GET').toUpperCase();
  var urlParams = spec.urlParams || [];

  return function() {
    var args = [].slice.call(arguments);
    var urlData = {};

    var callback = typeof args[args.length - 1] === 'function' ? args.pop() : null;
    var data = utils.isObject(args[args.length - 1]) ? args.pop() : {};

    // Wrap the callback in a deferred so it can be used as a promise.red
    var deferred = createDeferredCallback(callback);

    // Run through the urlparams and match them with the method arguments.
    for (var i = 0; i < urlParams.length; i++) {
      var param = urlParams[i];
      if (args[0]) {
        urlData[param] = args.shift();
      }
      else {
        urlData[param] = '';
      }
    }

    var requestCallback = function(err, resp) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(resp);
      }
    };

    var requestPath = urlCreator(urlData);
    this._antecons._request(requestPath, requestMethod, data, requestCallback);

    return deferred.promise;
  };
}

module.exports = Resource;
