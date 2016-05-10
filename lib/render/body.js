const classnames = require('classnames');
const asset = require('./asset');

module.exports = function bodyRender(props) {
    return `
<main>
    <header>
        <h1>${props.content_data.title}</h1>
    </header>
    ${props.content_data.body[0].map((b, idx) => {
        const { type, value, data } = b;
        if(type === 'text') {
            return `${value}`;
        } else {
            const { _mode, _metadata, _type } = data;
            const { style } = _metadata;
            return `
<div class=${classnames(`article-inline`,`article-inline--${_mode}`,{ [`article-inline--${_type}`]: _type },style)}>
    ${asset(data)}
</div>
`;
        }
    }).join(`\n`)}
</main>
    `;
};