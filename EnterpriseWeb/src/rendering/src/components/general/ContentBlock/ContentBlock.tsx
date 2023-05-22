// Components
import { BodyCopy } from 'src/helpers/BodyCopy';
import { ButtonGroup } from 'src/helpers/ButtonGroup';
import { Component } from 'src/helpers/Component';
import { ContentBlockTheme } from './ContentBlock.theme';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { getEnum } from 'lib/utils';
import { Headline } from 'src/helpers/Headline';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';

export type ContentBlockProps = Feature.EnterpriseWeb.Components.General.ContentBlock.ContentBlock;

export type ComponentAlignment = 'left' | 'center';
export type BackgroundColor = 'black' | 'gray' | 'white';

const ContentBlock = (props: ContentBlockProps): JSX.Element => {
  const alignment = getEnum<ComponentAlignment>(props.fields?.alignment) || 'left';
  const backgroundColor = getEnum<BackgroundColor>(props.fields?.backgroundColor) || 'white';
  const { themeData } = useTheme(ContentBlockTheme(alignment, backgroundColor));

  return (
    <Component
      variant="lg"
      backgroundVariant={getEnum(props.fields?.backgroundColor)}
      dataComponent="general/contentblock"
      {...props}
    >
      <div className={themeData.classes.contentWrapper}>
        <Headline defaultTag="h2" classes={themeData.classes.headlineClass} {...props} />
        <BodyCopy classes={themeData.classes.bodyClass} {...props} />
        <ButtonGroup classes={themeData.classes.buttonGroupClass} {...props} />
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<ContentBlockProps>(ContentBlock);
