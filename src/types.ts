export type ImageExtension = 'svg' | 'jpeg' | 'webp' | 'png' | 'jpg' | 'gif';
export type VideoExtension = 'mp4' | 'webm';

export type Options = Pick<
    ImageSourceProps,
    'src' | 'imageDetails' | 'secondarySrc' | 'secondaryImageDetails'
> &
    Pick<
        ImageLayoutProps,
        'layout' | 'objectFit' | 'objectPosition' | 'sizes' | 'secondaryImageBreakpoints'
    > &
    Pick<BaseProps, 'width' | 'height' | 'effects' | 'defaultFormat' | 'formats' | 'filename'>;

type Width = number;

export type Sizes = Partial<{
    mobile: Width;
    tablet: Width;
    notMobile: Width;
    mobileAndTablet: Width;
    desktop: Width;
    notDesktop: Width;
    desktopXl: Width;
    notDesktopXl: Width;
    allDesktops: Width;
    default?: Width;
}>;

export type BreakpointName = keyof Sizes;

export type SizesWithDefault = Sizes & {
    default: Width;
};

export type UploadcareEffectOptions = Pick<Options, 'width' | 'height' | 'imageDetails'>;

export type UploadcareEffect = string | ((options: UploadcareEffectOptions) => string);

export type UploadcareImageDetails = {
    uuid: string;
    version: number;
    filename: string;
    size: number;
    mime_type: string;
    original_width: number;
    original_height: number;
    effects: Array<string>;
};

type ImageSourceProps =
    | {
          src: string;
          /**
           * This prop only works in conjunction with `secondaryImageBreakpoints` prop. See its description for details.
           */
          secondarySrc?: string;
          imageDetails?: never;
          secondaryImageDetails?: never;
      }
    | {
          src?: never;
          secondarySrc?: never;
          imageDetails: UploadcareImageDetails;
          /**
           * This prop only works in conjunction with `secondaryImageBreakpoints` prop. See its description for details.
           */
          secondaryImageDetails?: UploadcareImageDetails;
      };

type ImageLayoutProps =
    | {
          layout: 'fill';
          objectFit: 'cover' | 'contain' | 'none' | 'fill';
          objectPosition?: string;
          /**
           * Sizes used to generate sources for different screen resolutions
           */
          sizes?: Sizes;
          /**
           * This only takes effect if `secondarySrc` or `secondaryImageDetails` props is provided.
           * For the selected breakpoints, secondary image will be loaded instead of the primary one.
           * This is useful if you need an alternative image for different screens,
           * but don't want the browser to download both images all the time.
           */
          secondaryImageBreakpoints?: BreakpointName[];
      }
    | {
          layout: 'fixed';
          objectFit?: never;
          objectPosition?: never;
          sizes?: never;
          secondaryImageBreakpoints?: never;
      };

type BaseProps = {
    alt?: string;
    className?: string;
    containerClassName?: string;
    /**
     * true if image loading should be deferred
     */
    lazy?: boolean;
    /**
     * Array of Uploadcare transformations
     *
     * Transformation can be one of:
     *   - string transformation, eg. '/grayscale/'
     *   - function that receives {@link (Options)} and returns transformation string
     */
    effects?: Array<UploadcareEffect>;
    filename?: string;
    formats?: ImageExtension[];
    /**
     * Format used for a fallback img src
     */
    defaultFormat?: ImageExtension;
    /**
     * Image width
     *
     * If not specified, component will try to determine it with following steps:
     *   - if it is an Uploadcare imageDetails object and height is specified,
     *     aspect ratio is calculated and width is calcualted basing on it (height * aspectRatio)
     *   - if it is an Uploadcare imageDetails object and height is not specified,
     *     original image width is used
     *   - fallback image width is used (5px) - this is used to make lighthouse happy.
     *     Image will be still shown nice (styled with css)
     */
    width?: number;
    /**
     * Image height
     *
     * If not specified, component will try to determine it with following steps:
     *   - if it is an Uploadcare imageDetails object and width is specified,
     *     aspect ratio is calculated and height is calcualted basing on it (width / aspectRatio)
     *   - if it is an Uploadcare imageDetails object and width is not specified,
     *     original image height is used
     *   - fallback image height is used (5px) - this is used to make lighthouse happy.
     *     Image will be still shown nice (styled with css)
     */
    height?: number;
};

export type UploadcareImageProps = BaseProps & ImageLayoutProps & ImageSourceProps;

export type PictureDetails = {
    sources: Array<{
        id: string;
        srcSet: string;
        media?: string;
        type?: string;
    }>;
    image: {
        src: string;
    };
};

export type Quality =
    | 'smart'
    | 'smart_retina'
    | 'normal'
    | 'better'
    | 'best'
    | 'lighter'
    | 'lightest';
