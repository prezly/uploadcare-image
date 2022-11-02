import type { Options } from '../../../../types';
import { effect, getSizes, prepareUploadcareUrl } from '../../lib';

export function getGifPoster(options: Options) {
    const { imageDetails, filename, src, effects = [], width } = options;

    const sizes = getSizes(options);

    return prepareUploadcareUrl({
        width: width || sizes.default,
        imageDetails,
        src,
        filename,
        effects: [...effects, effect.format('png'), effect.format('auto')],
    });
}
