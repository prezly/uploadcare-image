import type { ImageExtension, Options } from '../../../../types';
import { effect } from '../../lib';
import { prepareUploadcareUrl } from '../../lib/prepareUploadcareUrl';

type Parameters = Pick<Options, 'imageDetails' | 'filename' | 'src' | 'effects'> & {
    size: number;
    format: ImageExtension;
};

export function getSrcSet({ imageDetails, filename, src, size, format, effects = [] }: Parameters) {
    const defaultImageUrl = prepareUploadcareUrl({
        width: size,
        imageDetails,
        filename,
        src,
        effects: [
            ...effects,
            effect.resize(size),
            effect.format(format),
            effect.progressive(),
            effect.quality(),
        ],
    });
    const retinaImageUrl = prepareUploadcareUrl({
        width: size * 2,
        imageDetails,
        filename,
        src,
        effects: [
            ...effects,
            effect.resize(size * 2),
            effect.format(format),
            effect.progressive(),
            effect.quality(),
        ],
    });

    return `${defaultImageUrl} 1x, ${retinaImageUrl} 2x`;
}
