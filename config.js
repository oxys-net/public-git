var nconf = require('nconf');

nconf.file({ file: './etcs/config-base.json' })
     .argv()
     .env()
     .file({ file: '../etc/config.json' });


module.exports = nconf;
