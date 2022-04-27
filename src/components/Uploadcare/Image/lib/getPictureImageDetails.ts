import { Options } from '../../../../types';
import effect from '../../lib/effects';
import getSizes from '../../lib/getSizes';
import prepareUploadcareUrl from '../../lib/prepareUploadcareUrl';
import getFormats from './getFormats';

const getPictureImageDetails = (options: Options) => {
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
};

export default getPictureImageDetails;
