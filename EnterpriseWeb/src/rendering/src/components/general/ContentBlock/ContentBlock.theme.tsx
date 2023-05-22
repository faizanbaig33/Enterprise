import classNames from 'classnames';
import { ThemeFile } from 'lib/context/ThemeContext';
import { ComponentAlignment, BackgroundColor } from './ContentBlock';

const getDynamicButtonStyles = (backgroundColor: BackgroundColor): string => {
  return classNames(`${backgroundColor === 'black' ? 'text-primary' : ''}`);
};

const getDynamicStyles = (alignment: ComponentAlignment): string => {
  return classNames(
    `${
      alignment === 'left' ? 'col-span-12' : 'col-span-12 col-start-0 md:col-span-10 md:col-start-2'
    }`
  );
};

export const ContentBlockTheme = (
  alignment: ComponentAlignment,
  backgroundColor: BackgroundColor
): ThemeFile => {
  return {
    aw: {
      classes: {
        contentWrapper: classNames(
          backgroundColor != 'white' ? 'py-l' : '',
          getDynamicStyles(alignment)
        ),
        headlineClass: 'text-theme-text text-sm-m md:text-m font-bold mb-s',
        bodyClass: 'text-theme-body text-body mb-s',
        buttonGroupClass: {
          wrapper: 'flex-col',
          cta1Classes: 'mr-2 mb-m md:mb-0',
          cta2Classes: 'ml-xs md:ml-0 px-s md:px-0',
        },
      },
    },
    rba: {
      classes: {
        contentWrapper: classNames(
          backgroundColor != 'white' ? 'py-l' : '',
          getDynamicStyles(alignment)
        ),
        headlineClass: 'text-theme-text text-sm-m md:text-m font-medium mb-s',
        bodyClass: 'text-theme-body text-body mb-s',
        buttonGroupClass: {
          wrapper: 'flex-col md:items-center',
          cta1Classes: 'mr-2',
          cta2Classes: classNames(getDynamicButtonStyles(backgroundColor), 'my-s md:my-0 mx-s'),
        },
      },
    },
  };
};
