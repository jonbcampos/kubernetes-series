const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const os = require('os');

const admin = require('firebase-admin');
const serviceAccount = require('/opt/firebase/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseUrl: 'https://kubernetes-series-secrets.firebaseio.com' 
});

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
    const configVar = config.get('SOME_VALUE');
    res.status(200).json({ remoteAddress, hostName, configVar });
});

router.get('/secret', function(req, res, next) {
    admin.auth().listUsers(100)
        .then(function(result){
           res.status(200).json(result);  
        })
        .catch(function(error){
            console.log(error); 
        });
});

module.exports = router;