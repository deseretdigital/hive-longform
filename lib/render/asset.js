module.exports = function asset(asset) {
    const { _mode: assetMode, _type: assetType } = asset;
    if(assetMode === 'media') {
        const { source_medium, _metadata: assetMetadata } = asset;
        const { caption } = assetMetadata;
        return `
            <div className="article-inline__body">
                <img src=${source_medium} />
                <p className="article-inline__caption">${caption}</p>
            </div>
        `;
    } else if(assetType === 'gallery') {
        const { images } = asset.content.content_data;
        return `
            <div class="article-inline__body">
                <div class="gallery">
                    ${images.map((image, idx) => {
                        const { source_medium, _metadata } = image;
                        const { caption } = _metadata;
                        return `
                            <div class="gallery-image">
                                <img src=${source_medium} />
                                <p class="gallery-image__caption">${caption}</p>
                            </div>
                        `;
                    })}
                </div>
            </div>
        `;
    }
}
