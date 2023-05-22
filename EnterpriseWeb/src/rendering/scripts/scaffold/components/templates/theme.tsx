/* eslint-disable */
import { Template } from '../utils';
// Utils
import { getImportString, JSSTemplateArgs, ImportCategories } from './utils';

export const themeTemplate: Template<JSSTemplateArgs> = ({componentName}) => {
  /**
   * Imports
   */
   const imports: Record<ImportCategories, string[]> = {
    components: [],
    global: [],
    lib: [],
    local: [],
    test: [],
  };

  imports.lib.push(`import { ThemeFile } from 'lib/context/ThemeContext';`)
  /**
   * Template
   */
  return `${getImportString( imports )}export const ${componentName}Theme: ThemeFile = {
  aw: {
    classes: {
      /** Insert Theme classes here **/
      headline: 'abc-123',
    },
  },
  rba: {
    classes: {
      /** Insert Theme classes here **/
    },
  },
};
/* Example of more advanced builder */
/*
import classNames from 'classnames';
const getDynamicStyles = (theme: ThemeName): string => {
  return classNames('text-xl', theme === 'aw' ? 'color-orange' : 'color-green');
};
export const ${componentName}Theme = (): ThemeFile => {
  return {
    aw: {
      classes: {
        // Insert Theme classes here  - sample function call
        headline: classNames(getDynamicStyles('aw')),
      },
    },
    rba: {
      classes: {
        // Insert Theme classes here  - sample function call
        headline: classNames(getDynamicStyles('rba')),
      },
    },
  };
};
*/
`;
};
