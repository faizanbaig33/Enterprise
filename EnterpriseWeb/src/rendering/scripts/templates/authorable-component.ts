// const { getImportString, hasChoice } = require('@dullaghan/cli-scaffold-templates');

// const getDataComponentString = (name, subdirectory) =>
//   `${subdirectory.dataComponent}${name.toLowerCase()}`;

// module.exports = ({ name, subdirectory, jssOpts }) => {
//   const { hasPlaceholder, hasGetStaticProps } = hasChoice(
//     ['hasPlaceholder', 'hasGetStaticProps'],
//     jssOpts
//   );

//   /**
//    * Imports
//    */
//   const imports = {
//     components: [`import Container from 'src/helpers/Container/Container';`],
//     global: [],
//     lib: [],
//     local: [],
//     test: [],
//   };

//   // Different options want different parts of this lib
//   const staticPropsPartials = ['GetStaticComponentProps'];
//   let allPartials = [];

//   if (hasGetStaticProps) {
//     imports.lib.push(`import graphQLClientFactory from 'lib/graphql/client-factory';`);
//     imports.lib.push(`import query from './${name}.graphql';`);
//     allPartials = allPartials.concat(staticPropsPartials);
//   }

//   if (hasGetStaticProps || hasPlaceholder) {
//     allPartials.push('ComponentRendering');
//   }

//   if (allPartials.length > 0) {
//     imports.global.push(
//       `import { ${allPartials.join(', ')} } from '@sitecore-jss/sitecore-jss-nextjs';`
//     );
//   }

//   // Placeholder
//   if (hasPlaceholder) {
//     imports.components.push(
//       `import PlaceholderWrapper from 'src/helpers/PlaceholderWrapper/PlaceholderWrapper';`
//     );
//   }

//   const placeholderContent = hasPlaceholder
//     ? `<PlaceholderWrapper
//         rendering={rendering}
//         name="placeholder-name"
//         render={(components) => (
//           <>{components}</>
//         )}
//         renderEmpty={(components) => ({ components })}
//       />`
//     : '';

//   const componentInterface = `export interface ${name}Props {
//   fields?: {};${
//     hasPlaceholder
//       ? `
//   rendering: ComponentRendering;`
//       : ''
//   }
// }
// `;

//   const staticPropsInterface = hasGetStaticProps
//     ? `export interface ${name}StaticData {
//   datasource: {}
// }
// `
//     : '';

//   const jsxProps = hasPlaceholder ? 'fields, rendering' : 'fields';

//   /**
//    * Static Props Fetch
//    */
//   const staticPropsFetch = hasGetStaticProps
//     ? `
// /* istanbul ignore next - We aren't running E2E tests. */
// export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData) => {
//   const graphQLClient = graphQLClientFactory();

//   const result = await graphQLClient.query({
//     query,
//     variables: {
//       datasource: rendering.dataSource,
//       contextItem: layoutData?.sitecore?.route?.itemId,
//     },
//   });

//   return result.data;
// };
// `
//     : '';

//   /**
//    * Template
//    */
//   return `${getImportString(imports)}${componentInterface}${staticPropsInterface}
// const ${name} = ({ ${jsxProps} }: ${name}Props): JSX.Element => {
//   // Fail out if we don't have any fields
//   if (!fields) {
//     return <></>;
//   }

//   return (
//     <Container dataComponent="${getDataComponentString(name, subdirectory)}">
//       ${placeholderContent || name}
//     </Container>
//   );
// };
// ${staticPropsFetch}
// export default ${name};
// `;
// };

export {};
