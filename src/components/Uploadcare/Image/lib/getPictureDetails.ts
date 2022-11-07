import type { Options, PictureDetails } from '../../../../types';

import { getPictureImageDetails } from './getPictureImageDetails';
import { getPictureSources } from './getPictureSources';

export function getPictureDetails(options: Options): PictureDetails {
    return {
        sources: getPictureSources(options),
        image: getPictureImageDetails(options),
    };
}
