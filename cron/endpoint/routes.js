const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const os = require('os');

const router = express.Router();
let callCount = 0;
let lastCalledAt = null;
//-------------------------------------
//
// Automatically parse request body as JSON
//
//-------------------------------------
router.use(bodyParser.json());

//-------------------------------------
//
// Set Content-Type for all responses for these routes
//
//-------------------------------------
router.use((req, res, next) => {
    res.set('Content-Type', 'application/json');
    next();
});

//-------------------------------------
//
// Routes
//
//-------------------------------------
router.get('/', function (req, res, next) {
    res.status(200).json({ hello: 'world' });
});

router.get('/api', function (req, res, next) {
    const remoteAddress = req.connection.remoteAddress;
    const hostName = os.hostname();
    res.status(200).json({ remoteAddress, hostName });
});

router.get(`/${config.get('POD_ENDPOINT')}`, function (req, res, next) {
    const remoteAddress = req.connection.remoteAddress;
    const hostName = os.hostname();
    const requestHost = req.headers.host;
    callCount += 1;
    lastCalledAt = new Date();
    res.status(200).json({ remoteAddress, hostName, requestHost, callCount, lastCalledAt });
});

router.get('/data', function (req, res, next) {
    const remoteAddress = req.connection.remoteAddress;
    const hostName = os.hostname();
    const requestHost = req.headers.host;
    res.status(200).json({ remoteAddress, hostName, requestHost, callCount, lastCalledAt });
});

module.exports = router;