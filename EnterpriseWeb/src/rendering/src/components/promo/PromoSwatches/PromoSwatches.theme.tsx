// Lib
import { ThemeFile } from 'lib/context/ThemeContext';
import { layoutStyle } from './PromoSwatches';
import classNames from 'classnames';

export const PromoSwatchesTheme = (layoutStyle: layoutStyle): ThemeFile => {
  return {
    aw: {
      classes: {
        eyebrow: classNames(
          'font-sans text-xxs font-regular text-dark-gray uppercase mb-m',
          layoutStyle === 'side-by-side' ? 'ml:mb-s' : 'ml:mb-m'
        ),
        headline: 'text-theme-text text-sm-m ml:text-m font-medium ml:font-heavy mb-s',
        bodycopy: 'text-theme-body text-body mb-m ml:mb-l font-regular',
        swatchCollection: {
          swatchTitle: 'text-theme-text text-sm-xs ml:text-xs font-medium mt-m ml:mt-l  mb-xs',
          swatchDescription: 'font-regular text-dark-gray text-body mb-m',
          swatchLabel: 'mx-auto !font-serif text-dark-gray text-small text-center font-regular ',
          swatchFooterCopy: 'font-regular text-theme-body text-small text-dark-gray mt-m',
        },
      },
    },
    rba: {
      classes: {
        eyebrow: 'font-serif uppercase text-text-link font-semi-bold mb-s',
        headline: 'text-theme-text text-sm-m ml:text-l font-medium mb-xxs ml:mb-s',
        bodycopy: 'text-theme-body text-body mb-m ml:mb-ml font-regular',
        swatchCollection: {
          swatchTitle: classNames(
            '!font-serif text-theme-text text-body font-bold mt-l mb-xxs',
            layoutStyle === 'full-width' ? 'ml:mt-l' : 'ml:mt-ml'
          ),
          swatchDescription: 'font-regular text-dark-gray text-body ',
          swatchLabel: 'mx-auto font-serif text-dark-gray text-body font-regular ',
          swatchFooterCopy: 'font-regular text-theme-body text-xxs text-dark-gray',
        },
      },
    },
  };
};
