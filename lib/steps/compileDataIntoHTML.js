const cli = require('cli');

const articleRender = require('../render/article');

module.exports = function(data) {
    return new Promise((resolve, reject) => {
        cli.info(`Compiling data into HTML for ${data.id}`);
        const article = articleRender(data);
        resolve(article);
    });
}
