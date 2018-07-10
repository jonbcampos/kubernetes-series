const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const os = require('os');
const http = require('http');

const router = express.Router();

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

router.get(config.get('POD_ENDPOINT'), function (req, res, next) {
    const remoteAddress = req.connection.remoteAddress;
    const hostName = os.hostname();
    const requestHost = req.headers.host;
    res.status(200).json({ remoteAddress, hostName, requestHost });
});

router.get('/foreign', function (req, res, next) {
    const url = config.get('FOREIGN_SERVICE') + config.get('FOREIGN_PATH');
    http.get(url, response => {
        let data = '';
        response.on('data', chunk => {
            data += chunk;
        });
        response.on('end', () => {
            res.status(200).json(JSON.parse(data));
        });
    }).on('error', err => {
        throw err;
    });
});

module.exports = router;