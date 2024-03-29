import type { Options, Sizes } from '../../../../types';
import { MediaBreakpoints } from '../../constants';
import { getSizes } from '../../lib/getSizes';

import { getFormats } from './getFormats';
import { getImageMimeType } from './getImageMimeType';
import { getSrcSet } from './getSrcSet';

export function getPictureSources(options: Options) {
    const { imageDetails, filename, src, effects } = options;

    const formats = getFormats(options);
    const sizes = getSizes(options);

    return formats.flatMap((format) => {
        const entries = Object.entries(sizes) as Array<[keyof Sizes, number]>;
        return entries.map(([breakpoint, size]) => ({
            id: `${format}-${breakpoint}-${size}`,
            type: getImageMimeType(format),
            media: MediaBreakpoints[breakpoint],
            srcSet: getSrcSet({ imageDetails, filename, src, size: size!, effects, format }),
        }));
    });
}
