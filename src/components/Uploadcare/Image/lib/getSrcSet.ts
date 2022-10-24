import type { ImageExtension, Options } from '../../../../types';
import effect from '../../lib/effects';
import prepareUploadcareUrl from '../../lib/prepareUploadcareUrl';

type Parameters = Pick<Options, 'imageDetails' | 'filename' | 'src' | 'effects'> & {
    size: number;
    format: ImageExtension;
};

const getSrcSet = ({ imageDetails, filename, src, size, format, effects = [] }: Parameters) => {
    const defaultImageUrl = prepareUploadcareUrl({
        width: size,
        imageDetails,
        filename,
        src,
        effects: [...effects, effect.resize(size), effect.format(format)],
    });
    const retinaImageUrl = prepareUploadcareUrl({
        width: size * 2,
        imageDetails,
        filename,
        src,
        effects: [...effects, effect.resize(size * 2), effect.format(format)],
    });

    return `${defaultImageUrl} 1x, ${retinaImageUrl} 2x`;
};

export default getSrcSet;
