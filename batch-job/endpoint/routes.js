const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const os = require('os');

const router = express.Router();
const calls = [];
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

router.get(`/single`, function (req, res, next) {
    const remoteAddress = req.connection.remoteAddress;
    const hostName = os.hostname();
    const requestHost = req.headers.host;
    calls.push({
        requester: 'single',
        calledAt: new Date()
    });
    res.status(200).json({ remoteAddress, hostName, requestHost, calls });
});

router.get(`/sequential`, function (req, res, next) {
    const remoteAddress = req.connection.remoteAddress;
    const hostName = os.hostname();
    const requestHost = req.headers.host;
    calls.push({
        requester: 'sequential',
        calledAt: new Date()
    });
    res.status(200).json({ remoteAddress, hostName, requestHost, calls });
});

router.get(`/parallel`, function (req, res, next) {
    const remoteAddress = req.connection.remoteAddress;
    const hostName = os.hostname();
    const requestHost = req.headers.host;
    calls.push({
        requester: 'parallel',
        calledAt: new Date()
    });
    res.status(200).json({ remoteAddress, hostName, requestHost, calls });
});

router.get('/data', function (req, res, next) {
    const remoteAddress = req.connection.remoteAddress;
    const hostName = os.hostname();
    const requestHost = req.headers.host;
    res.status(200).json({ remoteAddress, hostName, requestHost, calls });
});

module.exports = router;