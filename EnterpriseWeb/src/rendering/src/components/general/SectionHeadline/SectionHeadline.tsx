import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { Component } from 'src/helpers/Component';
import { Headline } from 'src/helpers/Headline';
import { getEnum } from 'lib/utils';
import { useTheme } from 'lib/context/ThemeContext';
import { SectionHeadlineTheme } from './SectionHeadline.theme';

export type SectionHeadlineProps =
  Feature.EnterpriseWeb.Components.General.SectionHeadline.SectionHeadline;

export type TextAlignment = 'left' | 'center';
export type BorderStyle = 'default' | 'dark' | 'light';

const SectionHeadline = (props: SectionHeadlineProps): JSX.Element => {
  const alignment = getEnum<TextAlignment>(props.fields?.alignment) || 'left';
  const borderStyle = getEnum<BorderStyle>(props.fields?.underlineStyle) || 'default';

  const { themeData } = useTheme(SectionHeadlineTheme(alignment, borderStyle));

  return (
    <Component variant="lg" dataComponent="general/sectionheadline" {...props}>
      <div className="col-span-12">
        <Headline classes={themeData.classes.headlineContainer} {...props} />
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<SectionHeadlineProps>(SectionHeadline);
