const cli = require('cli');
const _ = require('lodash');
const articleRender = require('../render/article');
const projectState = require('../projectState');
module.exports = function(data) {
    return new Promise((resolve, reject) => {
        cli.info('Parsing headers from text');
        const headers = _.filter(
            data.content_data.body[0].map(
                (line) => typeof line.value === 'string' ? line.value.match(`<${projectState.section_tag || 'h2'}>(.+)</${projectState.section_tag || 'h2'}>`) : null
            )
        ).map(match => match[1]);
        cli.info(`Headers found: ${headers.join(', ')}`)
        resolve({data, headers});
    });
}
