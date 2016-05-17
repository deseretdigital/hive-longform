var styleRender = require('./style');
var scriptRender = require('./script');
var bodyRender = require('./body');
var headerRender = require('./header');
var extLibraries = require('./extlib');
var cli = require('cli');

module.exports = function articleRender(props, headers) {
    cli.info('Compositing article');
    const title = props.content_data.title;
    const html = `
<html>
    <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
        ${styleRender(props)}
        ${headerRender(props)}
    </head>
    <body>
        ${bodyRender(props, headers)}
        ${extLibraries(props)}
        ${scriptRender(props)}
    </body>
</html>
`;
    return(html);
}
