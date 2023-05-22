import { Component } from 'src/helpers/Component';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
//Helpers
import { BodyCopy } from 'src/helpers/BodyCopy';
import { Eyebrow } from 'src/helpers/Eyebrow';
import { Headline } from 'src/helpers/Headline';
import SingleButton from 'src/helpers/SingleButton/SingleButton';
import { SliderWrapper } from 'src/helpers/SliderWrapper';

import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { PromoImageGridTheme } from './PromoImageGrid.theme';
import { useTheme } from 'lib/context/ThemeContext';
import ImageWrapper from 'src/helpers/Media/ImageWrapper';
import { Image } from 'src/helpers/Media';
import { getBreakpoint, useCurrentScreenType } from 'lib/utils/get-screen-type';
import { getEnum, getHeadingLevel, useExperienceEditor } from 'lib/utils';

export type PromoImageGridImageProps =
  Feature.EnterpriseWeb.Components.Promo.PromoImageGrid.PromoImageGridImage;

export type PromoImageGridProps =
  Feature.EnterpriseWeb.Components.Promo.PromoImageGrid.PromoImageGrid & {
    fields: {
      children: [PromoImageGridImageProps];
    };
  };

export type MobileStyle = 'carousel' | 'grid';

const PromoImageGrid = (props: PromoImageGridProps): JSX.Element => {
  const mobileStyle = getEnum<MobileStyle>(props.fields?.mobileStyle) || 'carousel';
  const copyAlignRight = props.fields?.copyAlignRight?.value;
  const isMobileCarousel = mobileStyle === 'carousel' ? true : false;
  const { themeName, themeData } = useTheme(PromoImageGridTheme(copyAlignRight, isMobileCarousel));
  const imageCount = props.fields?.children?.length;
  const { currentScreenWidth } = useCurrentScreenType();

  const isEE = useExperienceEditor();

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const renderImages = () => {
    if (currentScreenWidth < getBreakpoint('md')) {
      // Renderings for mobile devices
      if (isMobileCarousel) {
        //display a carousel swiper
        return (
          <SliderWrapper sliderSettings={sliderSettings} theme={themeName}>
            {props.fields?.children?.map((_item: PromoImageGridImageProps, i: number) => {
              return (
                <div key={i} className="text-center">
                  <Image key={i} image={_item.fields?.primaryImage} layout="intrinsic" />
                </div>
              );
            })}
          </SliderWrapper>
        );
      } else if (imageCount <= 3) {
        // display grid with large top image
        return (
          <div className="container mx-auto">
            <div className={themeData.classes.mobileThreeImageGrid}>
              {props.fields?.children?.map((_item: PromoImageGridImageProps, i: number) => {
                if (i === 0) {
                  return (
                    <div key={i} className="col-span-2">
                      <ImageWrapper
                        image={_item.fields?.primaryImage}
                        imageLayout="responsive"
                        ratio="square"
                      ></ImageWrapper>
                    </div>
                  );
                } else {
                  return (
                    <div key={i}>
                      <ImageWrapper
                        image={_item.fields?.primaryImage}
                        imageLayout="responsive"
                        ratio="square"
                      ></ImageWrapper>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      } else {
        //display a grid of images
        return (
          <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-s">
              {props.fields?.children?.map((_item: PromoImageGridImageProps, i: number) => {
                return (
                  <ImageWrapper
                    key={i}
                    image={_item.fields?.primaryImage}
                    imageLayout="responsive"
                    ratio="square"
                  ></ImageWrapper>
                );
              })}
            </div>
          </div>
        );
      }
    } else if (
      currentScreenWidth >= getBreakpoint('md') &&
      currentScreenWidth < getBreakpoint('ml') &&
      imageCount <= 3
    ) {
      // display grid with large top image to the side of the copy
      return (
        <div className="container mx-auto flex md:w-1/2">
          <div className="grid w-full grid-cols-2 gap-s">
            {props.fields?.children?.map((_item: PromoImageGridImageProps, i: number) => {
              if (i === 0) {
                return (
                  <div key={i} className="col-span-2">
                    <ImageWrapper
                      image={_item.fields?.primaryImage}
                      imageLayout="responsive"
                      ratio="square"
                    ></ImageWrapper>
                  </div>
                );
              } else {
                return (
                  <div key={i}>
                    <ImageWrapper
                      image={_item.fields?.primaryImage}
                      imageLayout="responsive"
                      ratio="square"
                    ></ImageWrapper>
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
    } else {
      // Renderings for large screen devices
      return (
        <div className="flex w-full md:w-2/3 ml:w-3/4">
          <div className="container mx-auto">
            <div className="grid gap-s md:grid-cols-2 ml:grid-cols-3">
              {props.fields?.children?.map((_item: PromoImageGridImageProps, i: number) => {
                return (
                  <ImageWrapper
                    key={i}
                    image={_item.fields?.primaryImage}
                    imageLayout="responsive"
                    ratio="square"
                  ></ImageWrapper>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Component variant="lg" dataComponent="promo/promoimagegrid" {...props}>
      <div className={themeData.classes.componentWrapper}>
        <div className={themeData.classes.copyStyle}>
          <div className="w-full">
            <Eyebrow
              useTag={getHeadingLevel('h2', props.fields?.eyebrowLevel)}
              classes={themeData.classes.eyebrowClass}
              {...props}
            />
            <Headline classes={themeData.classes.headlineClass} {...props} />
            <BodyCopy classes={themeData.classes.bodyClass} {...props} />
            {(props.fields?.cta1Link?.value?.href || isEE) && (
              <div className={themeData.classes.buttonClasses}>
                <SingleButton {...props} />
              </div>
            )}
          </div>
        </div>
        {renderImages()}
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<PromoImageGridProps>(PromoImageGrid);
