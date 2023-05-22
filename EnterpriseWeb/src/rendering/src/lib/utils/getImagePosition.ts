import { ItemExt } from 'lib/_.Sitecore.Override';
import { getEnum } from './get-enum';

type ImagePositions = 'left' | 'right';

export const getImagePosition = (defaultPos: string, imagePos?: ItemExt): string => {
  const imagePosition = getEnum<ImagePositions>(imagePos) || defaultPos;
  return imagePosition;
};
