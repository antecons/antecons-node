Antecons node.js
================

Node.js binding for the [Antecons API](https://api.antecons.net)

Installation and setup
----------------------

Include `antecons` somewhere in your project and instantiate the API with a
config containing your API key and API secret:
    
    var Antecons = require('antecons')({
        apiKey: 'your_api_key',
        apiSecret: 'your_api_secret',
        debug: true  // To get console messages.
    });

The `debug` value is optional and should only be `true` during development and
test.

Usage example
-------------

Currently, the API is quite simple and requires manual specification of the
endpoint urls. For example, to fetch all datasources:


    Antecons.get('/datasource', null, function(datasources) {
        console.log(datasources);        
    });

Or to add a new datasource:

    Antecons.get('/datasource', { title: 'Test' }, function(datasources) {
        console.log(datasources);        
    });
