const fs = require('fs');
const cli = require('cli');

module.exports = function() {
    return new Promise((resolve, reject) => {
        cli.info('Initializing');
        resolve();
    });
}
