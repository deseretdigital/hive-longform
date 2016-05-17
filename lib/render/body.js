const classnames = require('classnames');
const asset = require('./asset');
const projectState = require('../projectState');
const siteNav = require('./sites/nav');
var cli = require('cli');

module.exports = function bodyRender(props, headers) {
    cli.info('Compositing body');
    const siteLogo = siteNav[props.content_data.sites[0]] || '';
    return `
<main>
    <header>
        <div class="site-logo">${siteLogo}</div>
        <nav>
            <ul>
                ${(headers || []).map((header, idx) =>
                    `<li data-section=${idx+1}><span class="number">${idx+1}</span><span class="name">${header}</span></li>`
                ).join(`\n`)}
            </ul>
        </nav>
    </header>
    <section class="main-section">
        <h1>${props.content_data.title}</h1>
        <p>${props.content_data.summary}</p>
    </section>
    ${props.content_data.body[0].map((b, idx) => {
        const { type, value, data } = b;
        if(type === 'text') {
            return `${value}`;
        } else {
            const { _mode, _metadata, _type } = data;
            if(_mode === 'html') {
                return data.html;
            }
            const { style } = _metadata;
            return `
<div class="${classnames(`article-inline`,`article-inline--${_mode}`,{ [`article-inline--${_type}`]: _type },style)}">
    ${asset(data)}
</div>
`;
        }
    }).join(`\n`)}
</main>
    `;
};
