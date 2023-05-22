import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { Headline } from 'src/helpers/Headline';
import { useTheme } from 'lib/context/ThemeContext';
import { HeroTwoColumnTheme } from './HeroTwoColumn.theme';
import { Component } from 'src/helpers/Component';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { Subheadline } from 'src/helpers/Subheadline';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { ButtonGroup } from 'src/helpers/ButtonGroup';

export type HeroTwoColumnProps = Feature.EnterpriseWeb.Components.Hero.HeroTwoColumn;

const HeroTwoColumn = (props: HeroTwoColumnProps) => {
  const { themeName, themeData } = useTheme(HeroTwoColumnTheme);

  if (!props.fields) return null;

  return (
    <Component variant="lg" dataComponent="hero/herotwocolumn" gap="!gap-xxxs md:gap-s" {...props}>
      {themeName === 'rba' && (
        <div className="col-span-12 md:col-span-1">
          <span className="inline-block h-[3px] w-l bg-primary md:w-full"></span>
        </div>
      )}
      <div className={`col-span-12 ${themeName === 'rba' ? 'md:col-span-5' : 'md:col-span-6'}`}>
        <Headline useTag="h1" classes={themeData.classes.headlineClass} {...props} />
      </div>
      <div className="col-span-12 md:col-span-6">
        <Subheadline useTag="h2" classes={themeData.classes.subheadlineClass} {...props} />
        <BodyCopy classes={themeData.classes.bodyClass} {...props} />
        <ButtonGroup classes={themeData.classes.buttonGroupClass} {...props} />
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<HeroTwoColumnProps>(HeroTwoColumn);
