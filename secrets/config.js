'use strict';

const nconf = module.exports = require('nconf');
const path = require('path');

nconf
// 1. command-line arguments
    .argv()
    // 2. env variables
    .env([
        'SOME_VALUE'
    ])
    // 3. config file
    .file({ file: path.join(__dirname, 'config.json') })
    // 4. defaults
    .defaults({
        SOME_VALUE: ''
    });

// check required settings
checkConfig('SOME_VALUE');

function checkConfig(setting) {
    if (!nconf.get(setting)) {
        throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
    }
}