// Components
import { useTheme } from 'lib/context/ThemeContext';
import { getEnum } from 'lib/utils';

import { useExperienceEditor } from 'lib/utils';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { ButtonVariants } from 'src/helpers/Button';
import { ButtonGroup } from 'src/helpers/ButtonGroup';
import { Component } from 'src/helpers/Component';
import { ComponentBackgroundVariants } from 'src/helpers/Component/Component';
import { Headline } from 'src/helpers/Headline';
import { ImagePrimary } from 'src/helpers/Media';
import { Subheadline } from 'src/helpers/Subheadline';

import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { themePromoBannerAuthored } from './PromoBannerAuthored.theme';

export type PromoBannerAuthoredProps =
  Feature.EnterpriseWeb.Components.Promo.PromoBanner.PromoBannerAuthored;

export type HeadingLevel = 'h2' | 'h3' | 'h4';
export type TextAlignment = 'left' | 'center';
export type ImagePosition = 'right' | 'left';
export type BorderStyle = 'default' | 'dark' | 'light';
export type ComponentStyle =
  | 'brand-color-solid'
  | 'black-outline'
  | 'black-solid'
  | 'brand-color-outline';

const LegalCopyPartial = (condition: boolean, classNames: string, copyField: any): JSX.Element => {
  const isEE = useExperienceEditor();

  if ((!copyField || copyField?.value === '') && !isEE) {
    return <></>;
  }

  return (
    <>
      {condition && (
        <div className={classNames}>
          <RichText field={copyField} />
        </div>
      )}
    </>
  );
};

const MapAWComponentStyleToBackgroundVariant = (
  componentStyle: ComponentStyle
): ComponentBackgroundVariants => {
  switch (componentStyle) {
    case 'brand-color-solid':
      return 'primary';
    case 'black-solid':
      return 'secondary';
  }

  return 'white';
};

const MapRBAComponentStyleToBackgroundVariant = (
  componentStyle: ComponentStyle
): ComponentBackgroundVariants => {
  switch (componentStyle) {
    case 'brand-color-solid':
      return 'secondary';
    case 'black-solid':
      return 'primary';
  }

  return 'white';
};

const PromoBannerAuthored = (props: PromoBannerAuthoredProps): JSX.Element => {
  const hasImage = !!props.fields?.primaryImage?.value?.src;

  const imagePosition = getEnum<ButtonVariants>(props.fields?.imgPosition) ?? 'right';
  const ctaRightAlign =
    (hasImage && imagePosition === 'right') ||
    (!hasImage && props.fields?.ctaRightAlign?.value === true);
  const componentStyle =
    getEnum<ComponentStyle>(props.fields?.componentStyle) ?? 'brand-color-solid';
  const ctaOneExists = !!props.fields?.cta1Link?.value?.href;
  const ctaTwoExists = !!props.fields?.cta2Link?.value?.href;
  const ctaCount = ctaOneExists && ctaTwoExists ? 2 : ctaOneExists || ctaTwoExists ? 1 : 0;

  const { themeName, themeData } = useTheme(
    themePromoBannerAuthored(componentStyle, ctaRightAlign, hasImage, ctaCount)
  );

  const isAW = themeName === 'aw';
  const style = isAW
    ? MapAWComponentStyleToBackgroundVariant(componentStyle)
    : MapRBAComponentStyleToBackgroundVariant(componentStyle);

  return (
    <Component
      variant="lg"
      gap="gap-x-0"
      padding=" "
      dataComponent="promo/promobannerauthored"
      backgroundVariant={style}
      {...props}
    >
      <div className={themeData.classes.contentClasses.contentWrapperClass}>
        {hasImage && (
          <div className={themeData.classes.contentClasses.imageContainerClass}>
            <ImagePrimary
              {...props}
              imageLayout="fill"
              ratio={themeData.classes.contentClasses.imageRatio}
              additionalMobileClasses={
                themeData.classes.contentClasses.imageAdditionalMobileClasses
              }
            />
          </div>
        )}
        <div className={themeData.classes.contentClasses.copyContainerClass}>
          <Headline classes={themeData.classes.firstHeadline.headlineContainer} {...props} />
          {props.fields?.subheadlineText && (
            <Subheadline
              classes={themeData.classes.contentClasses?.subHeadlineContainer}
              {...props}
            />
          )}
          {props.fields?.body && (
            <BodyCopy classes={themeData.classes.contentClasses?.body} {...props} />
          )}
          {(hasImage || !ctaRightAlign) && (ctaOneExists || ctaTwoExists) && (
            <ButtonGroup classes={themeData.classes.buttonGroupClass} {...props} />
          )}
          {LegalCopyPartial(
            !isAW,
            themeData.classes.contentClasses.legalCopyClass,
            props.fields?.legalCopy
          )}
        </div>
        {!hasImage && ctaRightAlign && (ctaOneExists || ctaTwoExists) && (
          <ButtonGroup classes={themeData.classes.buttonGroupClass} {...props} />
        )}
      </div>
      {LegalCopyPartial(
        isAW,
        themeData.classes.contentClasses.legalCopyClass,
        props.fields?.legalCopy
      )}
    </Component>
  );
};

export default PromoBannerAuthored;
