import { ImageExtension, Options } from '../../../types';

const getImageExtension = (options: Options) => {
    const { src, imageDetails, filename } = options;

    const actualFileName = src || filename || imageDetails?.filename;
    if (!actualFileName) {
        return null;
    }

    return actualFileName.split('?')[0].match(/\.(?<extension>\w+)$/)?.groups
        ?.extension as ImageExtension | null;
};

export default getImageExtension;
