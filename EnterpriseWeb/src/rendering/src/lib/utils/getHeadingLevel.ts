import { ItemExt } from 'lib/_.Sitecore.Override';
import { getEnum } from './get-enum';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export const getHeadingLevel = (defHeading: string, level?: ItemExt): string => {
  const headingLevel = getEnum<HeadingLevel>(level) || defHeading;
  return headingLevel;
};
