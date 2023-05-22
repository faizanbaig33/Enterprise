import { ThemeFile } from 'lib/context/ThemeContext';
import { getImagePosition } from 'lib/utils/getImagePosition';
import { ItemExt } from 'lib/_.Sitecore.Override';
import { getEnum } from 'lib/utils';
import classNames from 'classnames';

const getPosition = (pos: ItemExt): string => {
  const imagePosition = getImagePosition('right', pos);
  return imagePosition;
};

const getImageDivCss = (imgPos: string, imgSpan: number): string => {
  const txtSpan = 12 - imgSpan;
  const startCol = imgPos === 'right' ? txtSpan + 1 : 1;
  const imageOrder = imgPos === 'right' ? 'order-first md:order-last' : 'order-first';
  const imageCss = `${imageOrder} col-span-6 cols-start-1 md:col-start-${startCol} md:col-span-${imgSpan}`;
  return imageCss;
};

const getTxtDivCss = (imgPos: string, imgSpan: number): string => {
  const txtSpan = 12 - imgSpan;
  const startSpan = imgPos === 'right' ? 1 : imgSpan + 1;
  const txtOrder = imgPos === 'right' ? 'order-last md:order-first' : 'order-last';
  const txtCss = `${txtOrder} flex items-center pt-2 col-span-6 my-auto md:col-start-${startSpan} md:col-span-${txtSpan}`;
  return txtCss;
};

const getImageInfo = (imageRatio: ItemExt): { span: number; aspect: string } => {
  const ratio = getEnum<string>(imageRatio) ?? '4:3';

  let info = { span: 7, aspect: 'picture' };
  switch (ratio) {
    case '4:3':
      info = { span: 7, aspect: 'picture' };
      break;
    case '16:9':
      info = { span: 8, aspect: 'video' };
      break;
    case '1:1':
      info = { span: 6, aspect: 'square' };
      break;
    case '3:2':
      info = { span: 6, aspect: 'snapshot' };
      break;
    default:
      info = { span: 6, aspect: 'square' };
      break;
  }

  return info;
};

export const PromoGenericTheme = (imagePosition: ItemExt, imageItem: ItemExt): ThemeFile => {
  const imgPos = getPosition(imagePosition);
  const imgInfo = getImageInfo(imageItem);

  return {
    aw: {
      classes: {
        txtDivClass: classNames(getTxtDivCss(imgPos, imgInfo.span), `h-full max-w-[480px]`),
        imageDivClass: classNames(getImageDivCss(imgPos, imgInfo.span), `h-full`),
        headlineClass: 'text-sm-m lg:text-m font-heavy mb-4',
        eyebrowClass: 'text-sm-xxs lg:text-xxs text-dark-gray uppercase font-extralight mb-4',
        bodyClass: 'text-body text-dark-gray mb-4',
        cta1Classes: 'mb-8',
        buttonClasses: {
          wrapper: 'mb-8',
          cta1Classes: '',
        },
        bottomHeadingClass: '!font-sans text-sm-xxs lg:text-xxs font-bold mb-2 uppercase',
        bottomDescriptionClass: 'text-body text-dark-gray mb-4',
        imageClasses: `aspect-${imgInfo.aspect}`,
        captionClass: 'mt-xxs italic text-left mb-s',
      },
    },
    rba: {
      classes: {
        txtDivClass: classNames(getTxtDivCss(imgPos, imgInfo.span), `h-full border-t border-gray`),
        imageDivClass: classNames(getImageDivCss(imgPos, imgInfo.span), `h-full`),
        headlineClass: 'text-sm-m lg:text-l font-extra-light mb-4',
        eyebrowClass: 'text-sm-xxs lg:text-xxs text-black uppercase font-extralight mb-4',
        bodyClass: 'text-body text-dark-gray mb-4',
        buttonClasses: {
          wrapper: 'mb-8',
          cta1Classes: '',
        },
        bottomHeadingClass: 'text-sm-xxs lg:text-xxs font-heavy mb-2',
        bottomDescriptionClass: 'text-xxs mb-4 text-dark-gray',
        imageClasses: `aspect-${imgInfo.aspect}`,
        captionClass: 'mt-xxs md:mt-xxxs italic border-primary border-l-2 pl-xxs text-left mb-s',
      },
    },
  };
};
