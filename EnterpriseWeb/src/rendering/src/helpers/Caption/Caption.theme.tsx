import { ThemeFile } from 'lib/context/ThemeContext';

export const CaptionTheme = (italic: boolean): ThemeFile => {
  return {
    aw: {
      classes: {
        captionContainer: `text-theme-text ml:text-secondary mt-xxs ${
          italic ? 'italic' : ''
        } text-left mb-s font-sans text-sm-xxs md:text-caption`,
      },
    },
    rba: {
      classes: {
        captionContainer:
          'text-theme-text ml:text-secondary mt-xxs md:mt-xxxs border-primary border-l-3 pl-xxs text-left mb-s text-sm-xxs md:text-body',
      },
    },
  };
};
