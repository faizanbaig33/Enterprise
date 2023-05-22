// Global
import { useTheme } from 'lib/context/ThemeContext';
import {
  ComponentRendering,
  LinkField,
  useSitecoreContext,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { Project } from 'src/.generated/Project.AndersenCorporation.model';
import Component from 'src/helpers/Component/Component';
import { ArticleTagsTheme } from './ArticleTags.theme';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

export type ArticleTagsProps = Feature.EnterpriseWeb.Components.Pages.ArticleTags.ArticleTags & {
  rendering: ComponentRendering;
};

const ArticleTags = (props: ArticleTagsProps): JSX.Element => {
  const { themeData } = useTheme(ArticleTagsTheme);
  const context = useSitecoreContext();

  const route = context.sitecoreContext.route;

  const page = route as Project.AndersenCorporation.AndersenWindows.Pages.ArticlePage;

  const fields = page?.fields;
  if (!fields?.tags) {
    return <></>;
  }

  const facetTags = fields.tags as unknown as Feature.EnterpriseWeb.Data.Search.FacetTag[];
  const linkField = props?.fields?.tagsLink as LinkField;
  const facetField = props?.fields?.facetId?.value || 'tags';

  return (
    <Component variant="ml" dataComponent="pages/articletags" {...props}>
      <div className={themeData.classes.tagsWrapper}>
        {facetTags.map((tag: Feature.EnterpriseWeb.Data.Search.FacetTag, index: number) => {
          return (
            <>
              {linkField?.value?.href && (
                <a
                  href={`${linkField?.value?.href}#f:${facetField}=[${tag.fields?.title?.value}]`}
                  key={index}
                >
                  <div className={themeData.classes.tag}>{tag.fields?.title?.value}</div>
                </a>
              )}
              {!linkField?.value?.href && (
                <div key={index} className={themeData.classes.tag}>
                  {tag.fields?.title?.value}
                </div>
              )}
            </>
          );
        })}
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<ArticleTagsProps>(ArticleTags);
