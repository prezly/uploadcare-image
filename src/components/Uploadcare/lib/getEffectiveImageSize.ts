import type { UploadcareImageDetails } from '../../../types';

const FALLBACK_SIZE = 5;

function getEffectiveWidth(
    width: number | undefined,
    height: number | undefined,
    imageDetails?: UploadcareImageDetails,
) {
    const aspectRatio = imageDetails
        ? imageDetails.original_width / imageDetails.original_height
        : null;

    if (typeof width === 'number') {
        return width;
    }

    if (typeof height === 'number' && aspectRatio) {
        return height * aspectRatio;
    }

    return imageDetails?.original_width || FALLBACK_SIZE;
}

function getEffectiveHeight(
    width: number | undefined,
    height: number | undefined,
    imageDetails?: UploadcareImageDetails,
) {
    const aspectRatio = imageDetails
        ? imageDetails.original_width / imageDetails.original_height
        : null;

    if (typeof height === 'number') {
        return height;
    }

    if (typeof width === 'number' && aspectRatio) {
        return width / aspectRatio;
    }

    return imageDetails?.original_height || FALLBACK_SIZE;
}

export function getEffectiveImageSize(
    width: number | undefined,
    height: number | undefined,
    imageDetails?: UploadcareImageDetails,
) {
    return {
        width: getEffectiveWidth(width, height, imageDetails),
        height: getEffectiveHeight(width, height, imageDetails),
    };
}
