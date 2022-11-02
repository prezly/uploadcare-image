import type { UploadcareImageProps } from '../../types';
import { UploadcareGif, UploadcareImage, UploadcareSvg } from '../Uploadcare';

import { getImageExtension } from './lib/getImageExtension';

export type Props = UploadcareImageProps;

export function Image(props: Props) {
    const extension = getImageExtension(props);

    // If it's a svg then there is no need for responsive image
    if (extension === 'svg') {
        return <UploadcareSvg {...props} />;
    }

    // If it's a gif image then show it as a video, using Uploadcare's gif2video transformation
    if (extension === 'gif') {
        return <UploadcareGif {...props} />;
    }

    // By default fallback to UploadcareImage with webp/png result formats
    return <UploadcareImage defaultFormat="png" formats={['webp', 'png']} {...props} />;
}
