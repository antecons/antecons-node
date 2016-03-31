/**
 * Methods for resources.
 *
 * Inspired by the Stripe API. MIT license.
 * Copyright (C) 2011 Ask Bjørn Hansen
 * Copyright (C) 2013 Stripe, Inc. (https://stripe.com)
 * See README for full license.
 */
'use strict';

const util = require('util'),
  utils = require('./utils');

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

class Resource {
  constructor(antecons, resourceSpec) {
    this._antecons = antecons;

    for (let name in resourceSpec) {
      this[name] = resourceSpec[name];
    }
  }

  /**
   * Create an API method from the given specification.
   */
  static method(spec) {
    const urlCreator = utils.makeURLInterpolator(spec.path || '');
    const requestMethod = (spec.method || 'GET').toUpperCase();
    const urlParams = spec.urlParams || [];

    return function() {
      const args = Array.prototype.slice.call(arguments);
      const urlData = {};

      const callback = typeof args[args.length - 1] === 'function' ? args.pop() : null;
      const d = args[args.length - 1];
      const data = util.isObject(d) || Array.isArray(d) ? args.pop() : undefined;

      // Wrap the callback in a deferred so it can be used as a promise.
      const deferred = createDeferredCallback(callback);

      // Run through the urlparams and match them with the method arguments.
      for (let i = 0; i < urlParams.length; i++) {
        const param = urlParams[i];
        if (args[0]) {
          urlData[param] = args.shift();
        }
        else {
          urlData[param] = '';
        }
      }

      const requestCallback = (err, resp) => {
        if (err) {
          deferred.reject(err);
        }
        else {
          deferred.resolve(resp);
        }
      };

      const requestPath = urlCreator(urlData);
      this._antecons._request(requestPath, requestMethod, data, requestCallback);

      return deferred.promise;
    };
  }
}

module.exports = Resource;
