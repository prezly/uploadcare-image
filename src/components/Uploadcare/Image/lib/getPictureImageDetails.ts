import { Options } from '../../../../types';
import { effect } from '../../lib';
import getSizes from '../../lib/getSizes';
import prepareUploadcareUrl from '../../lib/prepareUploadcareUrl';
import getFormats from './getFormats';
import getSrcSet from './getSrcSet';

const getPictureImageDetails = (options: Options) => {
    const { imageDetails, filename, src, defaultFormat, effects = [], width } = options;

    const sizes = getSizes(options);

    const formats = getFormats(options);
    const format = defaultFormat || formats[0];

    return {
        srcSet: getSrcSet({
            imageDetails,
            filename,
            src,
            format: format,
            size: width || sizes.default,
            effects: [...effects, effect.progressive(), effect.quality()],
        }),
        src: prepareUploadcareUrl({
            width: width || sizes.default,
            imageDetails,
            src,
            filename,
            effects: [
                ...effects,
                effect.resize(width || sizes.default),
                effect.format(format),
                effect.progressive(),
                effect.quality(),
            ],
        }),
    };
};

export default getPictureImageDetails;
