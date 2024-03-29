import type { Options, VideoExtension } from '../../../../types';
import { effect } from '../../lib';
import { getSizes } from '../../lib/getSizes';
import { prepareUploadcareUrl } from '../../lib/prepareUploadcareUrl';

const VIDEO_FORMATS: VideoExtension[] = ['webm', 'mp4'];

export function getGifSources(options: Options) {
    const { imageDetails, filename, src, effects = [], width } = options;

    const sizes = getSizes(options);

    return VIDEO_FORMATS.map((format) => ({
        format,
        type: `video/${format}`,
        src: prepareUploadcareUrl({
            isGif2Video: true,
            width: width || sizes.default,
            imageDetails,
            src,
            filename,
            effects: [...effects, effect.format(format)],
        }),
    }));
}
