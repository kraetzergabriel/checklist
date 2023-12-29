const connect = require('connect');
const serveStatic = require('serve-static');

connect()
    .use(serveStatic('./'))
    .listen(666, () => console.log('Server running on 666...'));
