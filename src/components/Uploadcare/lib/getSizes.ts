import type { Options, SizesWithDefault } from '../../../types';
import { Breakpoint } from '../constants';

const DEFAULT_SIZES: SizesWithDefault = {
    mobile: Breakpoint.SM,
    tablet: Breakpoint.MD,
    desktop: Breakpoint.LG,
    desktopXl: Breakpoint.XL,
    default: Breakpoint.MD,
};

export function getSizes(options: Options): SizesWithDefault {
    const { sizes, width } = options;

    if (typeof width === 'number') {
        return { default: width };
    }

    if (!sizes) {
        return DEFAULT_SIZES;
    }

    if (!('default' in sizes)) {
        const allSizes = Object.values(sizes).filter(
            (size) => typeof size === 'number',
        ) as Array<number>;
        return {
            ...sizes,
            default: Math.min(...allSizes),
        };
    }

    return sizes as SizesWithDefault;
}
