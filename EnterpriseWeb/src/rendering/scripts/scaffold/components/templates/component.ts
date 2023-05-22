/* eslint-disable */
import { Template } from '../utils';
// Utils
import { getDataComponentString, getImportString, hasChoice, JSSOpt, JSSTemplateArgs, ImportCategories } from './utils';

export const componentTemplate: Template<JSSTemplateArgs> = ({
  componentName, directories, jssOpts
}) => {
  const { hasPlaceholder, hasGetStaticProps } = hasChoice<JSSOpt>(
    ['hasPlaceholder', 'hasGetStaticProps'],
    jssOpts
  );

  const STATIC_PROPS_INTERFACE = `${componentName}StaticProps`;

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

  // Different options want different parts of this lib
  let allPartials: string[] = [];

  if (hasGetStaticProps) {
    imports.lib.push(
      `import graphQLClientFactory from 'lib/graphql/client-factory';`
    );
    imports.local.push(`import query from './${componentName}.graphql';`);
    imports.global.push(
      `import { ComponentPropsFetchFunction } from '@sitecore-jss/sitecore-jss-nextjs/types/sharedTypes/component-props';`
    );
    imports.global.push(`import { GetStaticPropsContext } from 'next';`);
  }

  if (hasPlaceholder) {
    allPartials.push('ComponentRendering');
  }

  allPartials.push('withDatasourceCheck');

  if (allPartials.length > 0) {
    imports.global.push(
      `import { ${allPartials.join(
        ', '
      )} } from '@sitecore-jss/sitecore-jss-nextjs';`
    );
  }

  // Placeholder
  if (hasPlaceholder) {
    imports.components.push(
      `import PlaceholderWrapper from 'src/helpers/PlaceholderWrapper/PlaceholderWrapper';`
    );
  }

  imports.global.push(`import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';`);
  imports.global.push(`import { useTheme } from 'lib/context/ThemeContext';`);
  imports.components.push(`import { Component } from 'src/helpers/Component';`);
  imports.components.push(`import { ${componentName}Theme } from './${componentName}.theme';`)

  const placeholderContent = hasPlaceholder
    ? `<PlaceholderWrapper
        rendering={rendering}
        name="placeholder-name"
        render={(components) => (
          <>{components}</>
        )}
        renderEmpty={(components) => ({ components })}
      />`
    : '';

  let componentInterface = `export type ${componentName}Props = Feature.EnterpriseWeb.Components.${directories[0].name}.${componentName}`;
  if (hasGetStaticProps) {
    componentInterface += ` & ${STATIC_PROPS_INTERFACE}`;
  }
  componentInterface += ';';

  // Static props interface
  const staticPropsInterface = hasGetStaticProps
    ? `interface ${STATIC_PROPS_INTERFACE} {
  staticProps: {}
}
`
    : '';

  /**
   * Static Props Fetch
   */
  const staticPropsFetch = hasGetStaticProps
    ? `
/* istanbul ignore next - We aren't running E2E tests. */
export const getStaticProps: ComponentPropsFetchFunction<
 GetStaticPropsContext,
 ${STATIC_PROPS_INTERFACE}
> = async (rendering, layoutData) => {
 const graphQLClient = graphQLClientFactory();
 const result = await graphQLClient.query({
   query,
   variables: {
     datasource: rendering.dataSource,
     language: layoutData.sitecore.context.language,
   },
 });
 return {
   staticProps: result.data,
 };
};
`
    : '';

  /**
   * Template
   */
  return `${getImportString(
    imports
  )}${staticPropsInterface}${componentInterface}
const ${componentName} = (props: ${componentName}Props) => {
  const { themeData } = useTheme(${componentName}Theme);

  return (
    <Component variant="lg" dataComponent="${getDataComponentString(componentName, directories)}" {...props}>
      ${placeholderContent || componentName}
    </Component>
  );
};
${staticPropsFetch}
export default withDatasourceCheck()<${componentName}Props>(${componentName});
`;
};
