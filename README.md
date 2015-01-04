Antecons node.js
================

Node.js binding for the [Antecons API](https://api.antecons.net).

Installation and setup
----------------------

Get it from `npm`:

    npm install --save antecons

Include `antecons` somewhere in your project and instantiate the API with a
config containing your API key and API secret:

```js    
var Antecons = require('antecons')({
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret',
  debug: true  // To get console messages.
});
```

The `debug` value is optional and should only be `true` during development and
test.

Usage example
-------------

Currently, the API is quite simple and only implements a single resource: the
`datasource`. To fetch a list of all datasources:

```js
Antecons.datasource.list(function(err, datasources) {
  console.log(datasources);
});
```

The API calls return a promise so you can also do this:

```js
Antecons.datasource.list()
  .then(function(datasources) {
    console.log(datasources);
  });
```

Testing
-------

    npm test

License
-------

MIT license.

The API uses some code from the Stripe API so here is their notice:

    Copyright (C) 2011 Ask Bjørn Hansen
    Copyright (C) 2013 Stripe, Inc. (https://stripe.com)

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
