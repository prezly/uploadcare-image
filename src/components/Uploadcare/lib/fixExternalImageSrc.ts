export function fixExternalImageSrc(src: string) {
    if (src.startsWith('//')) {
        return `https:${src}`;
    }

    return src;
}
