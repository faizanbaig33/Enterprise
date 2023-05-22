// Lib
import classNames from 'classnames';
import { ThemeFile } from 'lib/context/ThemeContext';

import { StylingVariation } from './HeroBlogArticle';

const getAWCopyContainerClass = (
  stylingVariation: StylingVariation,
  topBorder: boolean
): string => {
  let copyContainerClass =
    'col-span-12 lg:flex lg:flex-col lg:self-center lg:h-[100%] lg:justify-center';

  switch (stylingVariation) {
    case 'with image':
      copyContainerClass = classNames(copyContainerClass, 'lg:col-span-4 lg:mr-s');
      if (topBorder) {
        copyContainerClass = classNames(copyContainerClass, 'lg:border-b lg:border-b-gray');
      }
      break;
    case 'text only span first 10 columns':
      copyContainerClass = classNames(copyContainerClass, 'lg:col-span-10 lg:py-s');
      break;
    case 'text only span center 10 columns':
      copyContainerClass = classNames(copyContainerClass, 'lg:col-span-10 lg:col-start-2 lg:py-s');
      break;
    default:
      break;
  }

  const topBorderClass = topBorder ? 'border-solid border-t border-black' : 'px-xxs';
  const noTopBorderWithImage = !topBorder && stylingVariation != 'with image' ? 'lg:px-s' : '';
  copyContainerClass = classNames(copyContainerClass, topBorderClass, noTopBorderWithImage, 'py-m');

  return copyContainerClass;
};

const getRBACopyContainerClass = (
  stylingVariation: StylingVariation,
  topBorder: boolean
): string => {
  let copyContainerClass =
    'col-span-12 lg:flex lg:flex-col lg:self-center lg:h-[100%] lg:justify-center';

  switch (stylingVariation) {
    case 'with image':
      copyContainerClass = classNames(copyContainerClass, 'lg:col-span-4 lg:mr-s');

      if (!topBorder) {
        copyContainerClass = classNames(copyContainerClass, 'px-s lg:pl-l lg:pr-0');
      }
      break;
    case 'text only span first 10 columns':
      copyContainerClass = classNames(copyContainerClass, 'lg:col-span-10', 'mx-m', 'lg:mx-0');
      break;
    case 'text only span center 10 columns':
      copyContainerClass = classNames(
        copyContainerClass,
        'lg:col-span-10 lg:col-start-2',
        'mx-m',
        'lg:mx-0'
      );
      break;
    default:
      break;
  }

  const topBorderClass = topBorder ? 'border-solid border-t border-black' : '';
  copyContainerClass = classNames(copyContainerClass, topBorderClass, 'py-s');

  return copyContainerClass;
};

const getAWImageContainerClass = (): string => {
  return classNames('col-span-12', 'lg:col-span-8', 'lg:content-right', 'lg:items-right');
};

const getRBAImageContainerClass = (): string => {
  return classNames('col-span-12', 'lg:col-span-8', 'lg:content-right', 'lg:items-right');
};

const getCaptionOffset = (showImage: boolean, hasCaption: boolean): string => {
  if (showImage && hasCaption) {
    return 'pb-[1px]';
  }

  return '';
};

export const HeroBlogArticleTheme = (
  stylingVariation: StylingVariation,
  topBorder: boolean,
  showImage: boolean,
  hasCaption: boolean
): ThemeFile => {
  return {
    aw: {
      classes: {
        contentClasses: {
          headlineContainer: `text-theme-text text-sm-m lg:text-m font-heavy mb-s last:mb-0`,
          eyebrowContainer: `font-sans text-theme-text text-sm-xxs text-xxs uppercase mb-s`,
          copyContainerClass: getAWCopyContainerClass(stylingVariation, topBorder),
          body: `text-theme-body text-body font-regular mb-m last:mb-0`,
          imageContainerClass: getAWImageContainerClass(),
          captionClass: `absolute top-[100%] left-0 text-black`,
          fluidBackgroundClass: `mx-m lg:mx-0 ${getCaptionOffset(showImage, hasCaption)}`,
        },
      },
    },
    rba: {
      classes: {
        contentClasses: {
          headlineContainer: `text-theme-text text-sm-m lg:text-l font-extra-light font-sans mb-xxs lg:mb-s last:mb-0`,
          eyebrowContainer: `font-serif text-theme-text text-sm-xxs text-xxs font-bold uppercase mb-xxs lg:mb-s`,
          copyContainerClass: getRBACopyContainerClass(stylingVariation, topBorder),
          body: `text-theme-body text-body font-regular mb-xxs lg:mb-s last:mb-0`,
          imageContainerClass: getRBAImageContainerClass(),
          captionClass: `absolute top-[100%] left-0 text-black`,
          fluidBackgroundClass: `${showImage ? 'mx-m' : 'mx-0'} lg:mx-0 ${getCaptionOffset(
            showImage,
            hasCaption
          )}`,
        },
      },
    },
  };
};
