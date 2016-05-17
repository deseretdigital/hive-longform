const cli = require('cli');
const fs = require('fs');
const projectState = require('../projectState');
const path = require('path');

module.exports = function outputHTML(html) {
    return new Promise((resolve, reject) => {
        cli.info('Writing HTML file');
        const filePath = path.join(__dirname, '/../../', `build/${projectState.data.slug}.html`);
        var fd = fs.openSync(filePath, 'w');

        fs.writeFile(fd, html, (err, data) => {
            resolve(filePath);
        });
    });
}
