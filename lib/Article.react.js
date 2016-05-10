const React = require('react');
const { Component } = React;

module.exports = class Article extends Component {
    constructor(props) {
        super(props);
        this.state = { rendered: null };
    }
    componentWillReceiveProps(props) {
        const markup = `
            ${ReactDOMServer.renderToStaticMarkup(rendered)}
        `;
        this.iframe.contentWindow.postMessage(markup, '*');
        this.setState({
            rendered
        });
    }
    renderGalleryAsset(gallery) {
        const { content_data: contentData } = gallery;
        const { images } = contentData;
        return (
            <div className="gallery">
                {images.map((image, idx) => {
                    const { source_medium, _metadata } = image;
                    const { caption } = _metadata;
                    return (
                        <div className="gallery-image" key={idx}>
                            <img src={source_medium} />
                            <p className="gallery-image__caption">{caption}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
    renderAsset(data) {
        const { _mode: assetMode, _type: assetType, content: assetContent } = data;
        if(assetMode === 'media') {
            const { source_medium, _metadata: assetMetadata } = data;
            const { caption } = assetMetadata;
            return (
                <div className="article-inline__body">
                    <img src={source_medium} />
                    <p className="article-inline__caption">{caption}</p>
                </div>
            );
        } else if(assetType === 'gallery') {
            return (
                <div className="article-inline__body">
                    {this.renderGalleryAsset(assetContent)}
                </div>
            );
        }
        return (
            <div>
                {JSON.stringify(data)}
            </div>
        );
    }
    render() {
        const { props } = this;
        const { body } = props.content_data;
        return (
            <div>
                <style>${props.content_data.settings.css}</style>
                <main>
                    <header>
                        <h1>{props.content_data.title}</h1>
                    </header>
                    {body[0].map((b, idx) => {
                        const { type, value, data } = b;
                        if(type === 'text') {
                            return <div dangerouslySetInnerHTML={{ __html: value }} key={idx} />;
                        } else {
                            const { _mode, _metadata, _type } = data;
                            const { style } = _metadata;
                            return (
                                <div
                                    className={classnames(
                                        `article-inline`,
                                        `article-inline--${_mode}`,
                                        { [`article-inline--${_type}`]: _type },
                                        style
                                    )}
                                    key={idx}
                                >
                                    {this.renderAsset(data)}
                                </div>
                            );
                        }
                    })}
                </main>
                <script type="text/javascript">
                    ${props.content_data.settings.javascript}
                </script>
            </div>
        );
    }
}
