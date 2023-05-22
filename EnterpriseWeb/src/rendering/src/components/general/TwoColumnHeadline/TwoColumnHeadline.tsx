import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { Headline } from 'src/helpers/Headline';
import { Component } from 'src/helpers/Component';
import { TwoColumnHeadlineTheme } from './TwoColumnHeadline.theme';
import { useTheme } from 'lib/context/ThemeContext';
import { Subheadline } from 'src/helpers/Subheadline';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { ButtonGroup } from 'src/helpers/ButtonGroup';

export type TwoColumnHeadlineProps =
  Feature.EnterpriseWeb.Components.General.TwoColumnHeadline.TwoColumnHeadline;

const TwoColumnHeadline = (props: TwoColumnHeadlineProps) => {
  const { themeData } = useTheme(TwoColumnHeadlineTheme);

  if (!props.fields) return null;

  return (
    <Component variant="lg" dataComponent="general/twocolumnheadline" {...props}>
      <div className="col-span-12 md:col-span-6">
        <Headline classes={themeData.classes.headlineClass} {...props} />
      </div>
      <div className="col-span-12 md:col-span-6">
        <Subheadline classes={themeData.classes.subheadlineClass} {...props} />
        <BodyCopy classes={themeData.classes.bodyClass} {...props} />
        <ButtonGroup classes={themeData.classes.buttonGroupClass} {...props} />
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<TwoColumnHeadlineProps>(TwoColumnHeadline);
