'use strict';

const { Server } = require('@hapi/hapi');
const hapi = require('@hapi/hapi');


const server = hapi.Server({
    host: 'localhost',
    port: 3000
});

const routes = require('./routes');
server.route(routes);

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});


init();