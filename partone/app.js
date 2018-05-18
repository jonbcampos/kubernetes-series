const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const config = require('./config');
const healthCheck = require('express-healthcheck');
const pkg = require('./package');
const bodyParser = require('body-parser');
const os = require('os');

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
// we are using json for everything that this service handles
//
//-------------------------------------
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.set('Content-Type', 'application/json');
    next();
});

//-------------------------------------
//
// setup some routes for us to hit
//
//-------------------------------------
app.use('/', function (req, res, next) {
    res.status(200).json({});
});

app.use('/api', function (req, res, next) {
    const remoteAddress = req.connection.remoteAddress;
    const hostName = os.hostname();
    res.status(200).json({ remoteAddress, hostName });
});

app.use(`/api/${config.get('POD_ENDPOINT')}`, function (req, res, next) {
    const remoteAddress = req.connection.remoteAddress;
    const hostName = os.hostname();
    res.status(200).json({ remoteAddress, hostName });
});

//-------------------------------------
//
// other helpful routes when working with kubernetes
//
//-------------------------------------
app.use('/healthcheck', healthCheck());
app.use('/readiness', function (req, res, next) {
    res.status(200).json({ ready: true });
});
app.get('/version', function (req, res, next) {
    const version = pkg.version;
    res.status(200).json({ version });
});
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

module.exports = app;
