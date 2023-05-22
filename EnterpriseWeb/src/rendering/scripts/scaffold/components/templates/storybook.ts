/* eslint-disable */
import { Template } from '../utils';
// Utils
import { getImportString, hasChoice, JSSOpt, JSSTemplateArgs, ImportCategories, MOCK_DATA_DEFAULT, MOCK_DATA_STATIC_PROPS, getStoryBookString } from './utils';

export const storybookTemplate: Template<JSSTemplateArgs> = ({
  componentName, directories, jssOpts,
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
    global: [`import { Story, Meta } from '@storybook/react';`],
    lib: [],
    local: [`import ${componentName}, { ${componentName}Props } from './${componentName}';`],
    test: [],
  };

  if (hasGetStaticProps) {
    imports.global.push(
      `import { ComponentPropsContext } from '@sitecore-jss/sitecore-jss-nextjs';`
    );
    imports.local.push(
      `import ${MOCK_DATA_DEFAULT}, { ${MOCK_DATA_STATIC_PROPS} } from './${componentName}.mock-data';`
    );
  } else {
    imports.local.push(`import ${MOCK_DATA_DEFAULT} from './${componentName}.mock-data';`);
  }

  if (hasPlaceholder) {
    imports.global.push(`import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';`);
    imports.global.push(`import { createComponentFactory } from 'lib/mocks/mock-placeholder';`);
  }

  /**
   * Component Factory
   */
  const componentFactory = hasPlaceholder
    ? `const componentFactory = createComponentFactory();
`
    : '';

  /**
   * Decorators
   */
  const decorators = () => {
    if (!hasPlaceholder && !hasGetStaticProps) {
      return '';
    }

    const staticPropsDecorator = hasGetStaticProps
      ? `
    (Story) => <ComponentPropsContext value={staticPropsData}>{Story()}</ComponentPropsContext>,`
      : '';
    const placeholderDecorator = hasPlaceholder
      ? `
    (Story) => <SitecoreContext componentFactory={componentFactory}>{Story()}</SitecoreContext>,`
      : '';

    return `
  decorators: [${staticPropsDecorator}${placeholderDecorator}
  ],`;
  };

  /**
   * Output
   */
  return `${getImportString(imports)}${componentFactory}export default {
  title: '${getStoryBookString(componentName, directories)}',
  component: ${componentName},${decorators()}
} as Meta;
const Template: Story<${componentName}Props> = (props) => <${componentName} {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
`;
};
