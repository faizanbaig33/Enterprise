export { default as ImagePrimary } from './ImagePrimary';
// export { default as VideoPrimary } from './VideoPrimary';
export { default as MediaPrimary } from './MediaPrimary';

export { default as ImageSecondary } from './ImageSecondary';
// export { default as SecondaryVideo } from './SecondaryVideo';
export { default as MediaSecondary } from './MediaSecondary';

export { default as Image } from './Image';

export { default as SvgIcon } from './SvgIcon';

/**
 * The layout behavior of the image as the viewport changes size.
 */
export type LayoutValue = 'fill' | 'responsive' | 'intrinsic' | undefined;

/**
 * The focus area of the image when layout is 'fill'.
 */
export type FocusAreaValue =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'left top'
  | 'right top'
  | 'left bottom'
  | 'right bottom'
  | undefined;

export type RatioTypes =
  | 'hero'
  | 'video'
  | 'picture'
  | 'snapshot'
  | 'square'
  | 'portrait'
  | undefined;

export type maxwTypes =
  | 'max-w-lg'
  | 'max-w-xl'
  | 'max-w-2xl'
  | 'max-w-3xl'
  | 'max-w-4xl'
  | 'max-w-5xl'
  | 'max-w-6xl'
  | 'max-w-7xl'
  | 'max-w-[592px]'
  | 'w-full'
  | ''
  | undefined;

export type maxhTypes =
  | 'max-h-96'
  | 'max-h-80'
  | 'max-h-72'
  | 'max-h-64'
  | 'max-h-60'
  | 'max-h-56'
  | 'max-h-[592px]'
  | 'h-full'
  | ''
  | undefined;
