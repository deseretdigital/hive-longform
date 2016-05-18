var cli = require('cli');

module.exports = function asset(asset) {
    const { _mode: assetMode, _type: assetType, id } = asset;
    cli.info(`Compositing asset ${assetMode}, ${assetType}, ${id}`);
    if(assetMode === 'media') {
        const { source_large, source_medium, _metadata: assetMetadata } = asset;
        const { caption } = assetMetadata;
        return `
            <div class="article-inline__body">
                <img src=${source_large} />
                <p class="article-inline__caption">${caption}</p>
            </div>
        `;
    } else if(assetType === 'gallery') {
        const { images } = asset.content.content_data;
        return `
            <div class="article-inline__body">
                <div class="gallery">
                    ${images.map((image, idx) => {
                        const { source_large, source_standard, source_medium, source, _metadata } = image;
                        const { caption } = _metadata;
                        const sourceToUse = source_large ? source_large : (source_standard ? source_standard : source_medium);
                        return `
                            <div class="gallery-image">
                                <img src=${source_standard ? source_standard : source_medium} />
                                <p class="gallery-image__caption">${caption}</p>
                            </div>
                        `;
                    })}
                </div>
            </div>
        `;
    } else if(assetType === 'html') {
        const { html } = asset;
        return html;
    }
}
