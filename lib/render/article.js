var styleRender = require('./style');
var scriptRender = require('./script');
var bodyRender = require('./body');

module.exports = function articleRender(props) {
    const title = props.content_data.title;
    const html = `
<html>
    <head>
        <title>${title}</title>
        ${styleRender(props)}
    </head>
    <body>
        ${bodyRender(props)}
        ${scriptRender(props)}
    </body>
</html>
`;
    return(html);
}