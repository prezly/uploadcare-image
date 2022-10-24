import { classNames } from '../../../lib/classNames';
import type { UploadcareImageProps } from '../../../types';
import { getEffectiveImageSize } from '../lib/getEffectiveImageSize';

import { getGifPoster, getGifSources } from './lib';

export function UploadcareGif(props: UploadcareImageProps) {
    const {
        className,
        containerClassName,
        layout,
        objectFit,
        imageDetails,
        width,
        height,
        src,
        objectPosition,
    } = props;
    const sources = getGifSources(props);
    const poster = getGifPoster(props);

    const imageStyle =
        layout === 'fixed'
            ? undefined
            : {
                  objectFit,
                  objectPosition,
                  maxHeight: height,
                  maxWidth: width,
                  minHeight: height,
                  minWidth: width,
              };
    const videoSize = getEffectiveImageSize(width, height, imageDetails);

    return (
        <video
            {...videoSize}
            className={classNames(
                'uploadcare-image__gif',
                layout === 'fill' && 'uploadcare-image__layout-fill',
                containerClassName || className,
            )}
            poster={poster}
            style={imageStyle}
            autoPlay
            loop
            muted
            playsInline
        >
            {sources.map((source) => (
                <source
                    key={`${src || imageDetails?.uuid}${source.format}`}
                    src={source.src}
                    type={source.type}
                />
            ))}
        </video>
    );
}
