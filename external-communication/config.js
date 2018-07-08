const nconf = module.exports = require('nconf');
const path = require('path');

nconf
// 1. command-line arguments
    .argv()
    // 2. env variables
    .env([
        'GCLOUD_PROJECT',
        'POD_ENDPOINT',
        'FOREIGN_PATH',
        'FOREIGN_SERVICE'
    ])
    // 3. config file
    .file({ file: path.join(__dirname, 'config.json') })
    // 4. defaults
    .defaults({
        GCLOUD_PROJECT: '',
        POD_ENDPOINT: '',
        FOREIGN_PATH: '',
        FOREIGN_SERVICE: ''
    });

// check required settings
checkConfig('GCLOUD_PROJECT');
checkConfig('POD_ENDPOINT');
checkConfig('FOREIGN_SERVICE');
checkConfig('FOREIGN_PATH');

function checkConfig(setting) {
    if (!nconf.get(setting)) {
        throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
    }
}