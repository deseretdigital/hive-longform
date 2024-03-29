var cli = require('cli');
module.exports = function(props) {
    cli.info('Compositing external libraries');
    const externalLibraries = [];
    var libraries = props.content_data.settings.external_libraries;
    if((libraries || []).indexOf('jquery') > -1) {
        externalLibraries.push('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>');
    }
    if((libraries || []).indexOf('jwplayer') > -1) {
        externalLibraries.push('<script type="text/javascript" src="http://beta.deseretnews.com/js/jwplayer7/7.3.4/jwplayer.js"></script>');
    }
    return externalLibraries.join(`\n`);
}
