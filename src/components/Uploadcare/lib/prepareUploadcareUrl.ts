import { Options, UploadcareEffect, UploadcareEffectOptions } from '../../../types';
import fixExternalImageSrc from './fixExternalImageSrc';

type PrepareUrlProps = UploadcareEffectOptions &
    Pick<Options, 'src' | 'filename' | 'effects'> & {
        effects: UploadcareEffect[];
        isGif2Video?: boolean;
    };

const UPLOADCARE_CDN_URL = 'https://cdn.uc.assets.prezly.com';
const UPLOADCARE_MEDIA_PROXY_URL = 'https://proxy.uc.assets.prezly.com/';
const UPLOADCARE_GIF2VIDEO_PATH = 'gif2video';

const handleEffects = (options: PrepareUrlProps) => {
    const { effects, ...restOptions } = options;

    return effects.map((effect) => {
        if (typeof effect === 'function') {
            return effect(restOptions);
        }
        return effect;
    });
};

const prepareUploadcareMediaProxyUrl = (options: PrepareUrlProps) => {
    const { src, effects, isGif2Video } = options;
    return [
        UPLOADCARE_MEDIA_PROXY_URL,
        isGif2Video && UPLOADCARE_GIF2VIDEO_PATH,
        effects.length === 0 ? effects : ['', ...handleEffects(options)].join('-'),
        fixExternalImageSrc(src!),
    ]
        .filter(Boolean)
        .join('/');
};

const prepareUploadcareUrl = (options: PrepareUrlProps) => {
    const { imageDetails, src, filename, effects, isGif2Video } = options;

    // if external image, use media-proxy
    if (src) {
        return prepareUploadcareMediaProxyUrl(options);
    }

    return [
        UPLOADCARE_CDN_URL,
        imageDetails!.uuid,
        isGif2Video && UPLOADCARE_GIF2VIDEO_PATH,
        effects.length === 0 ? effects : ['', ...handleEffects(options)].join('-'),
        filename,
    ]
        .filter(Boolean)
        .join('/');
};

export default prepareUploadcareUrl;
