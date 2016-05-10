const cli = require('cli');
const request = require('request-promise');
const projectState = require('../../projectState');

module.exports = function(projectData) {
    return new Promise((resolve, reject) => {
        cli.info('Requesting data from Hive');
        const { id } = projectData;
        if(!id) {
            return reject('No ID specified');
        }
        projectState.data = projectData;
        request.get({
            uri: `http://dev.hive.pub/api/v2/content/${id}?related&html`,
            headers: {
                authentication: `token ${process.env.HIVE_API_TOKEN}`
            }
        }).then((resp) => {
            resolve(JSON.parse(resp));
        });
    });
}
