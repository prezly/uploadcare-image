import { Image } from './components/Image';

// Preserve default export for back-compatibility
// eslint-disable-next-line import/no-default-export
export default Image;

export { ImageProps } from './components/Image';
export * from './components/Uploadcare';
export { UploadcareImageProps, UploadcareEffect, UploadcareImageDetails } from './types';
