// Global
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { useTheme } from 'lib/context/ThemeContext';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

// Components
import { Component } from 'src/helpers/Component';
import { HeroBlogArticleTheme } from './HeroBlogArticle.theme';

import { getEnum, getHeadingLevel } from 'lib/utils';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { Caption } from 'src/helpers/Caption';
import { ComponentBackgroundVariants } from 'src/helpers/Component/Component';
import { Eyebrow } from 'src/helpers/Eyebrow';
import { Headline } from 'src/helpers/Headline';
import { ImagePrimary } from 'src/helpers/Media';

export type StylingVariation =
  | 'with image'
  | 'text only span first 10 columns'
  | 'text only span center 10 columns';

const GetStylingVariation = (stylingVariationField: any, hasImage: boolean): StylingVariation => {
  let stylingVariation = getEnum<StylingVariation>(stylingVariationField);

  if (!stylingVariation) {
    if (hasImage) {
      stylingVariation = 'with image';
    } else {
      stylingVariation = 'text only span first 10 columns';
    }
  }

  return stylingVariation;
};

export type HeroBlogArticleProps = Feature.EnterpriseWeb.Components.Hero.HeroBlogArticle;
const HeroBlogArticle = (props: HeroBlogArticleProps) => {
  const style = getEnum<ComponentBackgroundVariants>(props.fields?.backgroundColor) ?? 'white';
  const topBorder = style === 'white';
  const hasImage = !!props.fields?.primaryImage?.value?.src;
  const styleVariation = GetStylingVariation(props.fields?.stylingVariation, hasImage);
  const showImage = styleVariation === 'with image';
  const componentVariant = showImage ? 'lg' : 'full';
  const paddingSize = showImage ? 'relative' : 'relative lg:mx-auto md:max-w-screen-lg';
  const hasCaption = props?.fields?.primaryImageCaption?.value != '';

  const { themeData } = useTheme(
    HeroBlogArticleTheme(styleVariation, topBorder, showImage, hasCaption)
  );

  return (
    <Component
      variant={componentVariant}
      gap="gap-x-0"
      padding={paddingSize}
      fluidBackground={themeData.classes.contentClasses.fluidBackgroundClass}
      backgroundVariant={style}
      dataComponent="hero/heroblogarticle"
      {...props}
    >
      <div className={themeData.classes.contentClasses.copyContainerClass}>
        <Eyebrow
          useTag="h2"
          classes={themeData.classes.contentClasses?.eyebrowContainer}
          {...props}
        />
        <Headline
          useTag={getHeadingLevel('h1', props.fields?.headlineLevel)}
          classes={themeData.classes.contentClasses.headlineContainer}
          {...props}
        />
        <BodyCopy classes={themeData.classes.contentClasses?.body} {...props} />
        {showImage && (
          <Caption
            caption={props?.fields?.primaryImageCaption}
            classes={themeData.classes.contentClasses.captionClass}
            italic={false}
          ></Caption>
        )}
      </div>
      {showImage && (
        <div className={themeData.classes.contentClasses.imageContainerClass}>
          <ImagePrimary {...props} hideCaption={true} />
        </div>
      )}
    </Component>
  );
};

export default withDatasourceCheck()<HeroBlogArticleProps>(HeroBlogArticle);
