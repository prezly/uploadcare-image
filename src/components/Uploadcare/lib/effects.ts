import { ImageExtension, Quality, VideoExtension } from '../../../types';

const MAX_WIDTH = 3000;
const MAX_HEIGHT = 3000;

export function resize(width: number | null = null, height: number | null = null) {
    if (width == null && height === null) {
        throw new Error('At least one function argument has to be non-null');
    }

    const safeWidth = Math.min(width || MAX_WIDTH, MAX_WIDTH);
    const safeHeight = Math.min(height || MAX_HEIGHT, MAX_HEIGHT);

    if (width === null) {
        return `/resize/x${safeHeight}/`;
    }

    if (height === null) {
        return `/resize/${safeWidth}/`;
    }

    return `/resize/${safeWidth}x${safeHeight}/`;
}

export function crop(width: number, height: number) {
    const safeWidth = Math.min(width, MAX_WIDTH);
    const safeHeight = Math.min(height, MAX_HEIGHT);

    return `/crop/${safeWidth}x${safeHeight}/`;
}

export function progressive() {
    return `/progressive/yes/`;
}

export function quality(quality: Quality = 'smart') {
    return `/quality/${quality}/`;
}

export function format(format: ImageExtension | VideoExtension | 'auto') {
    return `/format/${format}/`;
}

export function grayscale() {
    return '/grayscale/';
}
