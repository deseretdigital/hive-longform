module.exports = function style(props) {
    return `
<script type="text/javascript">
    window.addEventListener('DOMContentLoaded', function() {
        ${props.content_data.settings.javascript}
    });
</script>`;
}
