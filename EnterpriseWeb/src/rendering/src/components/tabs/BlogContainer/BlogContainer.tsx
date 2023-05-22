// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { Placeholder, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';

import { hashCode } from 'src/helpers/Component/Component';

// Components
import { BlogContainerTheme } from './BlogContainer.theme';

export type BlogContainerProps = Feature.EnterpriseWeb.Components.Tabs.BlogContainer.BlogContainer;
const BlogContainer = (props: BlogContainerProps) => {
  const { themeData } = useTheme(BlogContainerTheme);

  return (
    <article
      data-component="tabs/blogcontainer"
      id={props.fields?.sectionId?.value || `id${hashCode(props.rendering?.dataSource)}`}
    >
      <Placeholder
        name="components"
        rendering={props}
        render={(childComponents) => {
          return childComponents.map((component, index) => (
            <div key={index} className={themeData.classes.contentWrapper}>
              {component}
            </div>
          ));
        }}
      />
    </article>
  );
};

export default withDatasourceCheck()<BlogContainerProps>(BlogContainer);
