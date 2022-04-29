import { MediaBreakpoints } from '../../constants';
import { BreakpointName, Options } from '../../../../types';
import getSizes from '../../lib/getSizes';
import getImageMimeType from './getImageMimeType';
import getSrcSet from './getSrcSet';
import getFormats from './getFormats';

const getPictureSources = (options: Options) => {
    const { imageDetails, secondaryImageDetails, filename, src, secondarySrc, effects, secondaryImageBreakpoints } = options;

    const formats = getFormats(options);
    const sizes = getSizes(options);

    const sizeEntries = Object.entries(sizes) as Array<[BreakpointName | 'default', number]>;

    return formats.flatMap((format) => {
        return sizeEntries.map(([breakpoint, size]) => {
            const selectedImageDetails = secondaryImageDetails && secondaryImageBreakpoints?.includes(breakpoint) ? secondaryImageDetails : imageDetails;
            const selectedSrc = secondarySrc && secondaryImageBreakpoints?.includes(breakpoint) ? secondarySrc : src;

            return {
                id: `${format}-${breakpoint}-${size}`,
                type: getImageMimeType(format),
                media: MediaBreakpoints[breakpoint],
                srcSet: getSrcSet({ imageDetails: selectedImageDetails, filename, src: selectedSrc, size: size!, effects, format }),
            };
        });
    });
};

export default getPictureSources;
