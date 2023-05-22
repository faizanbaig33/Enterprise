import classNames from 'classnames';
import { ThemeFile } from 'lib/context/ThemeContext';
import { TextAlignment } from './GenericCard';

const getHeadlineAlignmentStyles = (alignment: TextAlignment): string => {
  return alignment == 'center' ? classNames('justify-center') : '';
};

const getIconAlignmentStyles = (alignment: TextAlignment): string => {
  return alignment == 'center'
    ? classNames('mx-auto h-[80px] w-[80px]')
    : classNames(`h-[80px] w-[80px] text-${alignment}`);
};

const getTextAlignmentStyles = (alignment: TextAlignment): string => {
  return classNames(`text-${alignment}`);
};

const getButtonWrapperStyles = (alignment: TextAlignment): string => {
  return alignment === 'center'
    ? 'mb-m col-span-12 flex flex-col md:flex-row md:justify-center items-center'
    : 'mb-m col-span-12 flex flex-row';
};

export const GenericCardTheme = (alignment: TextAlignment): ThemeFile => {
  return {
    aw: {
      classes: {
        cardWrapper: 'flex grow flex-col',
        copyWrapper: classNames('flex grow flex-col mt-s', getTextAlignmentStyles(alignment)),
        eyebrow: 'text-sm-xs md:text-xs uppercase text-dark-gray mb-s font-regular',
        headline: classNames(
          'mb-xxs text-sm-s md:text-s font-heavy',
          getHeadlineAlignmentStyles(alignment)
        ),
        subheadline: 'mb-xxs text-sm-xs md:text-xs font-medium',
        body: 'text-theme-body text-body font-regular mb-s',
        buttonGroupClass: {
          wrapper: classNames(
            'mb-s flex items-start md:flex-row md:items-center md:space-x-4',
            getButtonWrapperStyles(alignment)
          ),
          cta1Classes: '',
        },
        iconClass: classNames(getIconAlignmentStyles(alignment)),
        textAlignment: classNames(getTextAlignmentStyles(alignment)),
      },
    },
    rba: {
      classes: {
        cardWrapper: 'flex grow flex-col border-b border-gray',
        copyWrapper: classNames('flex grow flex-col mb-s', getTextAlignmentStyles(alignment)),
        eyebrow: 'text-sm-xxs md:text-xxs uppercase mt-s mb-xxs font-bold',
        headline: classNames(
          'mb-xxs text-sm-s lg:text-s font-medium',
          getHeadlineAlignmentStyles(alignment)
        ),
        subheadline: '!font-serif font-bold mb-xxs text-body',
        body: 'text-theme-body text-body font-regular',
        buttonGroupClass: {
          wrapper: classNames(
            'mb-s flex items-start md:flex-row md:items-center md:space-x-4',
            getButtonWrapperStyles(alignment)
          ),
          cta1Classes: '',
        },
        iconClass: classNames(getIconAlignmentStyles(alignment)),
        textAlignment: classNames(getTextAlignmentStyles(alignment)),
      },
    },
  };
};
