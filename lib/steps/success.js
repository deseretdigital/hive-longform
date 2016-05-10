const cli = require('cli');
module.exports = function(path) {
    return new Promise((resolve, reject) => {
        cli.ok(`Success! ${path}`);
        resolve();
    });
};
