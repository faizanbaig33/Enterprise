/* eslint-disable */
import { Template } from '../utils';
// Utils
import { kebabCase, getImportString, hasChoice, JSSOpt, JSSTemplateArgs, ImportCategories } from './utils';

export const mockDataTemplate: Template<JSSTemplateArgs> = ({
  componentName, jssOpts,
}) => {
  const { hasGetStaticProps, hasPlaceholder } = hasChoice<JSSOpt>(
    ['hasGetStaticProps', 'hasPlaceholder'],
    jssOpts
  );
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

  if (hasPlaceholder) {
    imports.lib.push(`import { getSampleRenderingContext } from 'lib/mocks/mock-placeholder';`);
  }

  /**
   * UID
   */
  const UID = hasGetStaticProps
    ? `const UID = '${kebabCase(componentName)}-uid';
`
    : '';

  /**
   * Rendering Data
   */
  let renderingData = '';

  if (hasGetStaticProps) {
    renderingData += `uid: UID,
`;
  }

  if (hasPlaceholder) {
    renderingData += `...getSampleRenderingContext('placeholder-name'),
`;
  }

  const rendering = !!renderingData
    ? `
  rendering: {
    ${renderingData}componentName: '${componentName}',
  },
`
    : '';

  /**
   * Static Props Dictionary
   */
  const staticProps = hasGetStaticProps
    ? `export const staticPropsData = {
  [UID]: {},
};
`
    : '';

  /**
   * Output
   */
  return `${getImportString(imports)}${UID}const defaultData = {${rendering}};

${staticProps}export default defaultData;
`;
};
