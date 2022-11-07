import type { ImageExtension, Options } from '../../../../types';

const DEFAULT_FORMATS: ImageExtension[] = ['webp', 'png'];

export function getFormats(options: Options) {
    return options.formats || DEFAULT_FORMATS;
}
