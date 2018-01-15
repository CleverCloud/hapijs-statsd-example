'use strict';

const Hapi = require('hapi');
const StatsD = require('node-statsd');

// Create a server with a host and port
const server = Hapi.server({ 
    host: '0.0.0.0', 
    port: 8080 
});

const statsDClient = new StatsD();

// Add the route
server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, h) {
        statsDClient.increment('helloCounter');
        return 'hello world';
    }
});

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
