import type { Options } from '../../../../types';
import effect from '../../lib/effects';
import getSizes from '../../lib/getSizes';
import prepareUploadcareUrl from '../../lib/prepareUploadcareUrl';

const getGifPoster = (options: Options) => {
    const { imageDetails, filename, src, effects = [], width } = options;

    const sizes = getSizes(options);

    return prepareUploadcareUrl({
        width: width || sizes.default,
        imageDetails,
        src,
        filename,
        effects: [...effects, effect.format('png'), effect.format('auto')],
    });
};

export default getGifPoster;
