var cli = require('cli');

module.exports = function style(props) {
    cli.info('Compositing scripts');

    return `
<script type="text/javascript">
    window.addEventListener('DOMContentLoaded', function() {
        ${props.content_data.settings.javascript}
    });
</script>`;
}
