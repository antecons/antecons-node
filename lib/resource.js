/**
 * Methods for resources.
 *
 * Inspired by the Stripe API. MIT license.
 * Copyright (C) 2011 Ask Bjørn Hansen
 * Copyright (C) 2013 Stripe, Inc. (https://stripe.com)
 * See README for full license.
 */
'use strict';

const utils = require('./utils');

/**
 * Wraps the given callback in a deferred. The callback will be called out of
 * the promise context.
 */
const createDeferredCallback = callback => {
  const deferred = utils.defer();

  if (callback) {
    deferred.promise
      .then(res => {
        setTimeout(() => callback(null, res), 0);
      })
      .catch(err => {
        setTimeout(() => callback(err, null), 0);
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
    var args = Array.prototype.slice.call(arguments);
    var urlData = {};

    var callback = typeof args[args.length - 1] === 'function' ? args.pop() : null;
    var d = args[args.length - 1];
    var data = utils.isObject(d) || Array.isArray(d) ? args.pop() : undefined;

    // Wrap the callback in a deferred so it can be used as a promise.
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

function Resource(antecons) {
  this._antecons = antecons;
}

Resource.extend = utils.protoExtend;
Resource.method = methodCreator;

module.exports = Resource;
