import { ImageExtension, VideoExtension } from "../../../types";

const MAX_WIDTH = 3000;
const MAX_HEIGHT = 3000;

const resize = (width: number | null = null, height: number | null = null) => {
    if (width == null && height === null) {
        throw new Error("At least one function argument has to be non-null");
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
};

export const crop = (width: number, height: number) => {
    const safeWidth = Math.min(width, MAX_WIDTH);
    const safeHeight = Math.min(height, MAX_HEIGHT);

    return `/crop/${safeWidth}x${safeHeight}/`;
};

export const format = (format: ImageExtension | VideoExtension | "auto") =>
    `/format/${format}/`;

export const grayscale = () => "/grayscale/";

export default {
    crop,
    format,
    grayscale,
    resize,
};
