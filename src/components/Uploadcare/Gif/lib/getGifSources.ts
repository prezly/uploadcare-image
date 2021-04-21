import { Options, VideoExtension } from '../../../../types';
import effect from '../../lib/effects';
import getSizes from '../../lib/getSizes';
import prepareUploadcareUrl from '../../lib/prepareUploadcareUrl';

const VIDEO_FORMATS: VideoExtension[] = ['webm', 'mp4'];

const getGifSources = (options: Options) => {
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
            effects: [effect.format(format), ...effects],
        })
    }));
};

export default getGifSources;
