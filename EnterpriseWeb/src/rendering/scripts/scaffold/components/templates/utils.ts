/* eslint-disable */
import { TemplateArgs, ConfigDirectory } from '../utils';
/**
 * Mock Data
 */
export const MOCK_DATA_DEFAULT = 'defaultData';
export const MOCK_DATA_STATIC_PROPS = 'staticPropsData';

 // Shortcut for questions that use the `checkbox` type to transform the option into a boolean
export const hasChoice = <T extends string>(opts: T[], choiceArray?: T[]): Record<T, boolean> => {
  if (!choiceArray || !Array.isArray(choiceArray)) {
    return opts.reduce((prev, curr) => ({ ...prev, [curr]: false }), {}) as Record<T, boolean>;
  }

  return opts.reduce(
    (prev, curr) => ({ ...prev, [curr]: choiceArray.includes(curr) }),
    {}
  ) as Record<T, boolean>;
};

export const getDataComponentString = (
  name: string, directories: ConfigDirectory[]
): string => {
  let paths = directories.map(_ => _.path).join('/');
  return `${paths}/${name.toLowerCase()}`;
}

export const getStoryBookString = (
  name: string, directories: ConfigDirectory[]
): string => {
  let names = directories.map(_ => _.name).join('/');
  return `${names}/${name}`;
}

/**
 * Custom template questions
 */
export type JSSOpt = 'hasGetStaticProps' | 'hasNextDynamic' | 'hasPlaceholder';
export interface JSSTemplateArgs extends TemplateArgs {
  jssOpts?: JSSOpt[];
}

export const kebabCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

const importOrder = ['global', 'generated', 'test', 'lib', 'components', 'local'];

export type ImportCategories =
  | 'global'
  | 'test'
  | 'lib'
  | 'components'
  | 'local';

export const getImportString = (
  imports: Record<ImportCategories, string[]>
): string => {
  // Fail out if no imports
  if (Object.keys(imports).length === 0) {
    return '';
  }

  let importString = '';
  importOrder.forEach((key) => {
    const items = imports[key as ImportCategories];
    if (items && items.length > 0) {
      importString += `// ${key.charAt(0).toUpperCase()}${key.slice(1)}
${items.sort().join(`
`)}
`;
    }
  });

  return !!importString
    ? `${importString}
`
    : '';
};
