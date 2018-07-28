const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const config = require('./config');
const http = require('http');

//-------------------------------------
//
// setup the app
//
//-------------------------------------
const app = express();
app.use(logger('dev'));
app.set('json spaces', 2);
app.set('trust proxy', true);
app.set('case sensitive routing', true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//-------------------------------------
//
// setup some routes for us to hit and
// other helpful routes when working with kubernetes
//
//-------------------------------------
process.on('SIGTERM', function () {
    // cleanup environment, this is about to be shut down
    process.exit(0);
});

//-------------------------------------
//
// catch 404 and forward to error handler
//
//-------------------------------------
app.use(function (req, res, next) {
    next(createError(404));
});

//-------------------------------------
//
// error handler
//
//-------------------------------------
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    err.response = {
        message: err.message,
        internalCode: err.code
    };
    // render the error page
    res.status(err.status || 500).json(err.response);
});

//-------------------------------------
//
// create server if this is main
//
//-------------------------------------
if (module === require.main) {
    // Start the server
    const server = app.listen(config.get('PORT'), () => {
        const endpoint = config.get('FOREIGN_SERVICE');
        console.log(config.get('MESSAGE'));
        console.log(`Calling endpoint ${endpoint}`);
        const port = server.address().port;

        http.get(endpoint, response => {
            let data = '';
            response.on('data', chunk => {
                data += chunk;
            });
            response.on('end', () => {
                console.log(`Called endpoint, got response ${data}`);
                process.exit(0);
            });
        }).on('error', err => {
            throw err;
        });
    });
}

module.exports = app;
