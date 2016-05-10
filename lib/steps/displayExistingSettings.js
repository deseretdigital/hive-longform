const cli = require('cli');
const fs = require('fs');

module.exports = function(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/../../projects/${file}`, 'utf8', (err, data) => {
            if(err) {
                return reject(err);
            }
            const parsedData = JSON.parse(data);
            cli.info(`${file} loaded`);
            cli.info(`Existing settings:`);
            Object.keys(parsedData).map(key => {
                console.log(`   - ${key}: ${JSON.stringify(parsedData[key])}`);
            });
            resolve(parsedData);
        });
    });
}
