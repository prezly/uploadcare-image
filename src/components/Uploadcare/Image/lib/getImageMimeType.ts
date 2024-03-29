import type { ImageExtension } from '../../../../types';

export function getImageMimeType(extension: ImageExtension) {
    switch (extension) {
        case 'png':
            return 'image/png';
        case 'webp':
            return 'image/webp';
        case 'jpeg':
            return 'image/jpeg';
        default:
            throw new Error(`${extension} MIME type is unknown`);
    }
}
