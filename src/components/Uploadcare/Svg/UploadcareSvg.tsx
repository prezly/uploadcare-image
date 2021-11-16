import React, { FunctionComponent } from 'react';

import classNames from '../../../lib/classNames';
import { UploadcareImageProps } from '../../../types';
import { getPictureDetails } from '../Image/lib';

const UploadcareSvg: FunctionComponent<UploadcareImageProps> = (props) => {
    const {
        className,
        alt,
        layout,
        objectFit,
        width,
        height,
        objectPosition,
        lazy,
    } = props;

    const { image } = getPictureDetails(props);
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

    return (
        <img
            className={classNames(
                className,
                'uploadcare-image__image',
                layout === 'fill' && 'uploadcare-image__layout-fill',
            )}
            loading={lazy ? 'lazy' : 'eager'}
            alt={alt}
            style={imageStyle}
            src={image.src}
        />
    );
};

export default UploadcareSvg;
