import { Component } from 'src/helpers/Component';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { MediaPrimary } from 'src/helpers/Media';
import { Headline } from 'src/helpers/Headline';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { useTheme } from 'lib/context/ThemeContext';
import { PromoGenericTheme } from './PromoGeneric.theme';
import { Eyebrow } from 'src/helpers/Eyebrow';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { RichTextWrapper } from 'src/helpers/RichTextWrapper';
import SingleButton from 'src/helpers/SingleButton/SingleButton';

export type PromoGenericProps = Feature.EnterpriseWeb.Components.Promo.PromoGeneric.PromoGeneric;

const PromoGeneric = (props: PromoGenericProps): JSX.Element => {
  const { themeData } = useTheme(
    PromoGenericTheme(props.fields.imgPosition, props.fields.imageRatio)
  );

  return (
    <Component variant="lg" dataComponent="general/promogeneric" {...props}>
      <div className={themeData.classes.txtDivClass}>
        <div className="">
          <Eyebrow classes={themeData.classes.eyebrowClass} {...props} />
          <Headline classes={themeData.classes.headlineClass} {...props} />
          <BodyCopy classes={themeData.classes.bodyClass} {...props} />
          <SingleButton classes={themeData.classes.buttonClasses} {...props} />
          <div className="items-bottom">
            <RichTextWrapper
              classes={themeData.classes.bottomHeadingClass}
              field={props.fields?.bottomCaptionHeadline}
            />
            <RichTextWrapper
              classes={themeData.classes.bottomDescriptionClass}
              field={props.fields?.bottomCaptionDescription}
            />
          </div>
        </div>
      </div>
      <div className={themeData.classes.imageDivClass}>
        <MediaPrimary
          {...props}
          imageLayout="intrinsic"
          maxH={'h-full'}
          additionalMobileClasses="aspect-picture"
        />
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<PromoGenericProps>(PromoGeneric);
