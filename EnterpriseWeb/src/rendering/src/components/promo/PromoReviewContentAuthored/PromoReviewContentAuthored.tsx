// Global
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ThemeFile, useTheme } from 'lib/context/ThemeContext';
import { getEnum } from 'lib/utils';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

// Components
import { Component } from 'src/helpers/Component';
import { ComponentBackgroundVariants } from 'src/helpers/Component/Component';
import { Headline } from 'src/helpers/Headline';
import { MediaPrimary } from 'src/helpers/Media';
import { RichTextWrapper } from 'src/helpers/RichTextWrapper';
import { StarRating, StarRatingProps } from 'src/helpers/StarRating';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { PromoReviewContentAuthoredTheme } from './PromoReviewContentAuthored.theme';

export type PromoReviewContentAuthoredProps =
  Feature.EnterpriseWeb.Components.Promo.PromoReviewContentAuthored.PromoReviewContentAuthored;
const maxStarRating = 5;

const getAWPromoReview = (
  props: PromoReviewContentAuthoredProps,
  themeData: ThemeFile | any,
  hasMedia: boolean
): JSX.Element => {
  const starRatingProps: StarRatingProps = {
    reviewStars: props?.fields?.reviewStars?.value,
    maxStars: maxStarRating,
    containerCSSClass: themeData.classes.contentClasses.starContainerClass,
  };

  return (
    <>
      <div className={themeData.classes.contentClasses.copyContainerClass}>
        <StarRating {...starRatingProps} />
        <RichTextWrapper
          field={props?.fields?.body}
          classes={themeData.classes.contentClasses?.body}
        />
        <div className={themeData.classes.contentClasses.reviewerNameClass}>
          {props?.fields?.reviewerName?.value}
        </div>
        <div className={themeData.classes.contentClasses.additionalInfoClass}>
          {props?.fields?.additionalInfo?.value}
        </div>
      </div>
      {hasMedia && (
        <div className={themeData.classes.contentClasses.imageContainerClass}>
          <MediaPrimary {...props} />
        </div>
      )}
    </>
  );
};

const getRBAPromoReview = (
  props: PromoReviewContentAuthoredProps,
  themeData: ThemeFile | any,
  hasMedia: boolean
): JSX.Element => {
  const starRatingProps: StarRatingProps = {
    reviewStars: props?.fields?.reviewStars?.value,
    maxStars: maxStarRating,
    containerCSSClass: themeData.classes.contentClasses.starContainerClass,
  };

  return (
    <>
      {!hasMedia && (
        <SvgIcon icon="quote" className={themeData.classes.contentClasses.quoteClass} />
      )}
      <div className={themeData.classes.contentClasses.copyContainerClass}>
        <StarRating {...starRatingProps} />
        <RichTextWrapper
          field={props?.fields?.body}
          classes={themeData.classes.contentClasses?.body}
        />
        <div className={themeData.classes.contentClasses.reviewerNameClass}>
          {props?.fields?.reviewerName?.value}
        </div>
        <div className={themeData.classes.contentClasses.additionalInfoClass}>
          {props?.fields?.additionalInfo?.value}
        </div>
      </div>
      {hasMedia && (
        <div className={themeData.classes.contentClasses.imageContainerClass}>
          <MediaPrimary {...props} />
        </div>
      )}
    </>
  );
};

const PromoReviewContentAuthored = (props: PromoReviewContentAuthoredProps) => {
  const hasMedia = !!props.fields?.primaryImage?.value?.src || !!props.fields?.primaryVideo;
  const style = getEnum<ComponentBackgroundVariants>(props.fields?.backgroundColor) ?? 'gray';
  const { themeName, themeData } = useTheme(PromoReviewContentAuthoredTheme(hasMedia, style));

  return (
    <>
      <Headline classes={themeData.classes.firstHeadline.headlineOutsideContainer} {...props} />
      <Component
        variant="full"
        dataComponent="promo/promoreviewcontentauthored"
        gap="gap-x-0"
        padding={themeData.classes.contentClasses.componentClass}
        backgroundVariant={style}
        {...props}
      >
        {themeName === 'aw'
          ? getAWPromoReview(props, themeData, hasMedia)
          : getRBAPromoReview(props, themeData, hasMedia)}
      </Component>
    </>
  );
};

export default withDatasourceCheck()<PromoReviewContentAuthoredProps>(PromoReviewContentAuthored);
