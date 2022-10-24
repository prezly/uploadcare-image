import type { FunctionComponent } from 'react';
import React from 'react';

import classNames from '../../../lib/classNames';
import type { UploadcareImageProps } from '../../../types';
import getEffectiveImageSize from '../lib/getEffectiveImageSize';

import { getPictureDetails } from './lib';

const UploadcareImage: FunctionComponent<UploadcareImageProps> = (props) => {
    const {
        className,
        containerClassName,
        alt,
        layout,
        objectFit,
        imageDetails,
        width,
        height,
        src,
        objectPosition,
        lazy,
    } = props;
    const { sources, image } = getPictureDetails(props);

    const imageStyle =
        layout === 'fixed'
            ? undefined
            : {
                  objectFit,
                  objectPosition,
              };
    const imageSize = getEffectiveImageSize(width, height, imageDetails);

    const altText = alt || imageDetails?.filename;

    return (
        <picture className={classNames('uploadcare-image__picture', containerClassName)}>
            {sources.map((source) => (
                <source
                    key={`${src || imageDetails?.uuid}${source.id}`}
                    srcSet={source.srcSet}
                    type={source.type}
                    media={source.media}
                />
            ))}

            <img
                {...imageSize}
                className={classNames(
                    className,
                    'uploadcare-image__image',
                    layout === 'fill' && 'uploadcare-image__layout-fill',
                )}
                loading={lazy ? 'lazy' : 'eager'}
                alt={altText}
                style={imageStyle}
                src={image.src}
            />
        </picture>
    );
};

export default UploadcareImage;
