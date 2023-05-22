// Lib
import classNames from 'classnames';
import { ThemeFile } from 'lib/context/ThemeContext';

export const StarRatingTheme: ThemeFile = {
  aw: {
    classes: {
      contentClasses: {
        starContainerClass: classNames('flex items-center'),
        starFillClass: '#F26924',
      },
    },
  },
  rba: {
    classes: {
      contentClasses: {
        starContainerClass: classNames('flex items-center'),
        starFillClass: '#6CC14C',
      },
    },
  },
};
