import type { Options } from '../../../../types';
import { effects as effect, getSizes, prepareUploadcareUrl } from '../../lib';

import { getFormats } from './getFormats';

export function getPictureImageDetails(options: Options) {
    const { imageDetails, filename, src, defaultFormat, effects = [], width } = options;

    const sizes = getSizes(options);

    const formats = getFormats(options);
    const format = defaultFormat || formats[0];

    return {
        src: prepareUploadcareUrl({
            width: width || sizes.default,
            imageDetails,
            src,
            filename,
            effects: [...effects, effect.resize(width || sizes.default), effect.format(format)],
        }),
    };
}
