import classNames from 'classnames';
import { ThemeFile, ThemeName } from 'lib/context/ThemeContext';
import { ComponentStyle } from './PromoBannerAuthored';

const getBorderClasses = (
  componentStyle: ComponentStyle,
  hasImage: boolean,
  ctaRightAlign: boolean
) => {
  if (ctaRightAlign && !hasImage) return '';

  let baseClasses = classNames(
    'after:absolute after:content-[""] after:-top-s lg:after:-top-m after:w-l md:after:w-[64px] after:h-[1px]'
  );

  if (hasImage) {
    baseClasses = classNames(baseClasses, 'after:hidden', 'lg:after:inline');
  } else {
    baseClasses = classNames(baseClasses);
  }

  switch (componentStyle) {
    case 'brand-color-solid':
      baseClasses = classNames(baseClasses, 'after:bg-black');
      break;
    case 'brand-color-outline':
      baseClasses = classNames(baseClasses, 'after:bg-black');
      break;
    case 'black-solid':
      baseClasses = classNames(baseClasses, 'after:bg-primary');
      break;
    case 'black-outline':
      baseClasses = classNames(baseClasses, 'after:bg-primary');
      break;
    default:
      break;
  }

  return classNames(baseClasses);
};

const getAWTextAlignment = (hasImage: boolean, ctaRightAlign: boolean): string => {
  if (hasImage) {
    return `text-start`;
  } else if (ctaRightAlign) {
    return `text-center md:text-start`;
  }

  return `text-center`;
};

const getRBATextAlignment = (hasImage: boolean, ctaRightAlign: boolean): string => {
  if (hasImage) {
  } else if (ctaRightAlign) {
  }

  return `text-left`;
};

const getAWCopyContainerClass = (
  hasImage: boolean,
  ctaRightAlign: boolean,
  ctaCount: number
): string => {
  let copyContainerClass = 'col-span-12 px-[15px] py-m';

  copyContainerClass = classNames(copyContainerClass, 'flex flex-col');

  if (ctaRightAlign) {
    copyContainerClass = classNames(copyContainerClass, 'md:-order-1');
  }

  if (hasImage) {
    copyContainerClass = classNames(
      copyContainerClass,
      'text-center',
      'md:col-span-8',
      'px-[15px]',
      'lg:px-m',
      'lg:py-[46.5px]',
      'items-start'
    );
  } else if (ctaRightAlign) {
    copyContainerClass = classNames(
      copyContainerClass,
      'text-center',
      'lg:p-[32px]',
      'items-center',
      'md:items-start'
    );

    if (ctaCount > 1) {
      copyContainerClass = classNames(copyContainerClass, 'md:col-span-8', 'pb-0');
    } else if (ctaCount > 0) {
      copyContainerClass = classNames(copyContainerClass, 'md:col-span-10', 'pb-0');
    }
  } else {
    copyContainerClass = classNames(
      copyContainerClass,
      'lg:px-[4.25rem]',
      'lg:pt-l',
      'lg:pb-l',
      'items-center',
      'md:col-span-12',
      'text-center'
    );
  }

  copyContainerClass = classNames(copyContainerClass, 'bg-theme-bg', 'text-theme-text');
  return copyContainerClass;
};

const getRBACopyContainerClass = (
  hasImage: boolean,
  ctaRightAlign: boolean,
  ctaCount: number
): string => {
  let copyContainerClass = 'col-span-12';

  copyContainerClass = classNames(copyContainerClass, 'lg:px-l');

  if (ctaRightAlign) {
    copyContainerClass = classNames(copyContainerClass, 'md:-order-1');
  }

  if (hasImage) {
    copyContainerClass = classNames(copyContainerClass, 'text-center', 'md:col-span-6');
    copyContainerClass = classNames(
      copyContainerClass,
      'pb-[32px]',
      'pt-[10px]',
      'md:pt-s',
      'px-[20px]',
      'lg:pt-[67px]',
      'lg:pb-[43px]'
    );
  } else if (ctaRightAlign) {
    copyContainerClass = classNames(copyContainerClass, 'text-center');
    copyContainerClass = classNames(
      copyContainerClass,
      'px-[20px]',
      'pt-s',
      'lg:pt-[25px]',
      'lg:pb-[29px]',
      'lg:pl-[39px]'
    );

    if (ctaCount > 1) {
      copyContainerClass = classNames(copyContainerClass, 'md:col-span-8', 'pb-0');
    } else if (ctaCount > 0) {
      copyContainerClass = classNames(copyContainerClass, 'md:col-span-10', 'pb-0');
    } else {
      copyContainerClass = classNames(copyContainerClass, 'pb-[20px]');
    }
  } else {
    copyContainerClass = classNames(
      copyContainerClass,
      'md:col-span-12',
      'text-center',
      'px-m pt-[48px]',
      'lg:pt-[64px]',
      'pb-[32px]',
      'lg:pb-l'
    );
  }

  copyContainerClass = classNames(copyContainerClass, 'bg-theme-bg', 'text-theme-text');
  return copyContainerClass;
};

const getAWContentWrapperClass = (componentStyle: ComponentStyle): string => {
  let contentWrapperClass = 'col-span-12 grid grid-cols-2 md:grid-cols-12';

  switch (componentStyle) {
    case 'brand-color-solid':
      const primarySolidBGClass = 'bg-primary';
      contentWrapperClass = classNames(contentWrapperClass, primarySolidBGClass, 'text-white');
      break;
    case 'brand-color-outline':
      contentWrapperClass = classNames(contentWrapperClass, 'border-2 border-primary');
      break;
    case 'black-solid':
      const secondSolidBGClass = 'bg-secondary';
      contentWrapperClass = classNames(contentWrapperClass, secondSolidBGClass, 'text-white');
      break;
    case 'black-outline':
      contentWrapperClass = classNames(contentWrapperClass, 'border-2', 'border-secondary');
      break;
    default:
      break;
  }
  return classNames(contentWrapperClass);
};

const getRBAContentWrapperClass = (componentStyle: ComponentStyle): string => {
  let contentWrapperClass = 'col-span-12 grid grid-cols-2 md:grid-cols-12';

  switch (componentStyle) {
    case 'brand-color-solid':
      const secondSolidBGClass = 'bg-primary';
      contentWrapperClass = classNames(contentWrapperClass, secondSolidBGClass, 'text-white');
      break;
    case 'brand-color-outline':
      contentWrapperClass = classNames(contentWrapperClass, 'border-2', 'border-primary');
      break;
    case 'black-solid':
      const primarySolidBGClass = 'bg-black';
      contentWrapperClass = classNames(contentWrapperClass, primarySolidBGClass, 'text-white');
      break;
    case 'black-outline':
      contentWrapperClass = classNames(contentWrapperClass, 'border-2', 'border-secondary');
      break;
    default:
      break;
  }
  return classNames(contentWrapperClass);
};

const getImageContainerClass = (theme: ThemeName): string => {
  switch (theme) {
    case 'aw':
      return classNames('col-span-12', 'md:col-span-4');
    case 'rba':
      return classNames('col-span-12', 'md:col-span-6');
    default:
      break;
  }
  return classNames('col-span-12', 'md:col-span-4');
};

const getAWCtaContainerClass = (
  hasImage: boolean,
  ctaRightAlign: boolean,
  ctaCount: number
): string => {
  let ctaContainerClass = classNames(
    'col-span-12',
    'flex',
    'flex-col',
    'md:flex-row',
    'md:content-center',
    'md:justify-center',
    'mb-0'
  );

  if (hasImage) {
    ctaContainerClass = classNames(
      ctaContainerClass,
      'items-start',
      'mt-m',
      'mb-s',
      'md:mt-[32px]'
    );
  } else if (ctaRightAlign) {
    ctaContainerClass = classNames(ctaContainerClass, 'items-center');
    ctaContainerClass = classNames(ctaContainerClass, 'pt-s pr-s pl-s pb-m md:p-m');

    if (ctaCount > 1) {
      ctaContainerClass = classNames(ctaContainerClass, 'md:col-span-4');
    } else if (ctaCount > 0) {
      ctaContainerClass = classNames(ctaContainerClass, 'md:col-span-2');
    }
    ctaContainerClass = classNames(ctaContainerClass, 'bg-theme-bg', 'text-theme-text');
  } else {
    ctaContainerClass = classNames(ctaContainerClass, 'items-center mt-m');
  }

  return ctaContainerClass;
};

const getRBACtaContainerClass = (
  hasImage: boolean,
  ctaRightAlign: boolean,
  ctaCount: number
): string => {
  let ctaContainerClass = classNames('col-span-12', 'flex', 'flex-col', 'md:flex-row', 'mb-0');

  if (hasImage) {
    ctaContainerClass = classNames(ctaContainerClass, 'items-start', 'mt-[13px] md:mt-s');
  } else if (ctaRightAlign) {
    ctaContainerClass = classNames(
      ctaContainerClass,
      'pt-s pr-s pl-s md:pt-0 md:pr-l md:pl-l',
      'md:items-center',
      'md:content-center',
      'md:justify-center'
    );

    if (ctaCount > 1) {
      ctaContainerClass = classNames(ctaContainerClass, 'md:col-span-4', 'pb-m', 'md:pb-0');
    } else if (ctaCount > 0) {
      ctaContainerClass = classNames(ctaContainerClass, 'md:col-span-2', 'pb-m', 'md:pb-0');
    }

    ctaContainerClass = classNames(ctaContainerClass, 'bg-theme-bg text-theme-text');
  } else {
    ctaContainerClass = classNames(ctaContainerClass, 'items-start', 'mt-s');
  }

  return ctaContainerClass;
};

const getAWCtaExtraClass = (): string => {
  const baseClasses = classNames('mt-s first:mt-0 md:mt-0 mr-0 md:mr-3 md:first:ml-0 md:last:mr-0');
  return classNames(baseClasses);
};

const getRBACtaExtraClass = (): string => {
  const baseClasses = classNames('mt-s first:mt-0 md:mt-0 mr-0 md:mr-3 md:first:ml-0 md:last:mr-0');
  return classNames(baseClasses);
};

const getAWBodyCopyPadding = (hasImage: boolean, ctaRightAlign: boolean): string => {
  let baseClasses = classNames();

  if (hasImage) {
    baseClasses = classNames('mt-m md:mt-s');
  } else if (ctaRightAlign) {
    baseClasses = classNames('mt-[10px]');
  } else {
    baseClasses = classNames('mt-m');
  }

  return classNames(baseClasses);
};

const getAWSubheadlinePadding = (hasImage: boolean, ctaRightAlign: boolean): string => {
  const baseClasses = classNames('mt-2');

  if (hasImage) {
    //
  } else if (ctaRightAlign) {
    //
  } else {
    //
  }

  return classNames(baseClasses);
};

const getRBASubheadlinePadding = (hasImage: boolean, ctaRightAlign: boolean): string => {
  let baseClasses = classNames('mt-xxs md:mt-s');

  if (hasImage) {
    baseClasses = classNames('mt-[6px] md:mt-s');
  } else if (ctaRightAlign) {
    //
  } else {
    //
  }

  return classNames(baseClasses);
};

const getRBABodyCopyPadding = (hasImage: boolean, ctaRightAlign: boolean): string => {
  let baseClasses = classNames();

  if (hasImage) {
    baseClasses = classNames('mt-[6px] md:mt-s');
  } else if (ctaRightAlign) {
    baseClasses = classNames('mt-[10px]');
  } else {
    baseClasses = classNames('mt-xxs md:mt-s');
  }

  return classNames(baseClasses);
};

const getRBALegalCopySpacing = (hasImage: boolean, ctaRightAlign: boolean): string => {
  let baseClasses = classNames();

  if (hasImage) {
    baseClasses = classNames('mt-s');
  } else if (ctaRightAlign) {
    baseClasses = classNames('mt-xs');
  } else {
    baseClasses = classNames('mt-s');
  }

  return classNames(baseClasses);
};

export const themePromoBannerAuthored = (
  componentStyle: ComponentStyle,
  ctaRightAlign: boolean,
  hasImage: boolean,
  ctaCount: number
): ThemeFile => {
  return {
    aw: {
      classes: {
        firstHeadline: {
          headlineContainer: `text-s md:text-m font-heavy text-theme-text ${getAWTextAlignment(
            hasImage,
            ctaRightAlign
          )}`,
          alignment: 'center',
        },
        contentClasses: {
          subHeadlineContainer: `text-sm-m lg:text-s font-medium ${getAWSubheadlinePadding(
            hasImage,
            ctaRightAlign
          )} text-theme-text ${getAWTextAlignment(hasImage, ctaRightAlign)}`,
          body: `text-body text-theme-text font-medium ${getAWBodyCopyPadding(
            hasImage,
            ctaRightAlign
          )} ${getAWTextAlignment(hasImage, ctaRightAlign)}`,
          imageContainerClass: getImageContainerClass('aw'),
          imageRatio: 'picture',
          imageAdditionalMobileClasses: 'aspect-picture max-h-[250px] md:h-full',
          contentWrapperClass: getAWContentWrapperClass(componentStyle),
          copyContainerClass: getAWCopyContainerClass(hasImage, ctaRightAlign, ctaCount),
          legalCopyClass: `text-legal mt-xxs col-span-12 text-left`,
        },
        buttonGroupClass: {
          wrapper: getAWCtaContainerClass(hasImage, ctaRightAlign, ctaCount),
          cta1Classes: getAWCtaExtraClass(),
          cta2Classes: getAWCtaExtraClass(),
        },
      },
    },
    rba: {
      classes: {
        firstHeadline: {
          headlineContainer: `text-s md:text-l font-extra-light text-theme-text ${getRBATextAlignment(
            hasImage,
            ctaRightAlign
          )} ${getBorderClasses(componentStyle, hasImage, ctaRightAlign)} relative`,
          alignment: 'left',
        },
        contentClasses: {
          subHeadlineContainer: `text-sm-xs lg:text-xs font-heavy ${getRBASubheadlinePadding(
            hasImage,
            ctaRightAlign
          )} text-theme-text ${getRBATextAlignment(hasImage, ctaRightAlign)} `,
          body: `text-body text-theme-text font-regular ${getRBABodyCopyPadding(
            hasImage,
            ctaRightAlign
          )} ${getRBATextAlignment(hasImage, ctaRightAlign)}`,
          imageContainerClass: getImageContainerClass('rba'),
          imageRatio: 'video',
          imageAdditionalMobileClasses: 'aspect-video max-h-[250px] md:h-full',
          contentWrapperClass: getRBAContentWrapperClass(componentStyle),
          copyContainerClass: getRBACopyContainerClass(hasImage, ctaRightAlign, ctaCount),
          legalCopyClass: `text-legal text-theme-text col-span-12 text-left ${getRBALegalCopySpacing(
            hasImage,
            ctaRightAlign
          )}`,
        },
        buttonGroupClass: {
          wrapper: getRBACtaContainerClass(hasImage, ctaRightAlign, ctaCount),
          cta1Classes: getRBACtaExtraClass(),
          cta2Classes: getRBACtaExtraClass(),
        },
      },
    },
  };
};
