const fs = require('fs');
const cli = require('cli');
const _ = require('lodash');
const rl = require('../../readline');

module.exports = function() {
    return new Promise((resolve, reject) => {
        cli.info('Finding existing projects');
        fs.readdir('./projects', (err, files) => {
            const matchedFiles = files.filter(file => file.indexOf('.') !== 0);
            const filesQuestion = matchedFiles.map((file, idx) => `${idx}: ${file}`).join(`\n`);
            rl.question(`${filesQuestion}\n`, (answer) => {
                rl.close();
                if(!matchedFiles[answer]) {
                    return reject('Invalid file selected');
                }
                return resolve(matchedFiles[answer]);
            });
        });
    });
}
