/* eslint-disable */
import { Template } from '../utils';
// Utils
import { getDataComponentString, getImportString, hasChoice, JSSOpt, JSSTemplateArgs, ImportCategories, MOCK_DATA_DEFAULT, MOCK_DATA_STATIC_PROPS } from './utils';

export const jestTemplate: Template<JSSTemplateArgs> = ({
  componentName, directories, jssOpts
}) => {
  const { hasGetStaticProps, hasNextDynamic } = hasChoice<JSSOpt>(
    ['hasGetStaticProps', 'hasNextDynamic'],
    jssOpts
  );

  /**
   * Imports
   */
  const imports: Record<ImportCategories, string[]> = {
    components: [],
    global: [],
    lib: [],
    local: [`import ${componentName} from './${componentName}';`],
    test: [],
  };

  imports.global.push(`import { hasDataComponent, snapshot } from 'lib/jest/test-utils';`);

  if (hasNextDynamic) {
    imports.global.push(`import dynamic from 'next/dynamic';`);
    imports.components.push(
      `import IconNewTab from 'src/helpers/SvgIcon/icons/icon--new-tab';`
    );
  }

  const mockDataImport = hasGetStaticProps
    ? `import ${MOCK_DATA_DEFAULT}, { ${MOCK_DATA_STATIC_PROPS} } from './${componentName}.mock-data';`
    : `import ${MOCK_DATA_DEFAULT} from './${componentName}.mock-data';`;
  imports.local.push(mockDataImport);

  /**
   * Mock Dynamic
   */
  const mockDynamic = (): string =>
    hasNextDynamic
      ? `// Mock out the SvgIcon dynamic import
jest.mock('next/dynamic');

beforeAll(() => {
  dynamic.mockImplementation(() => IconNewTab);
});
`
      : '';

  /**
   * Rendering Options Data
   */
  const renderingOptionsData = [`componentProps: ${MOCK_DATA_DEFAULT}`];
  if (hasGetStaticProps) {
    renderingOptionsData.push(`staticProps: ${MOCK_DATA_STATIC_PROPS}`);
  }

  /**
   * Template
   */
  return `${getImportString(imports)}${mockDynamic()}it('renders correctly', () => {
  const component = snapshot(${componentName}, { ${renderingOptionsData.join(', ')} });
  hasDataComponent(component, '${getDataComponentString(componentName, directories)}');
});
`;
};
