// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { ImageField, Text, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { Component } from 'src/helpers/Component';
import { CuratedImageDisplayTheme } from './CuratedImageDisplay.theme';
import { ComponentProps } from 'lib/component-props';
import { getEnum } from 'lib/utils';
import { Headline } from 'src/helpers/Headline';
import { BodyCopy } from 'src/helpers/BodyCopy';
import SingleButton from 'src/helpers/SingleButton/SingleButton';
import { ImagePrimary } from 'src/helpers/Media';
import { SliderWrapper } from 'src/helpers/SliderWrapper';
import { useCurrentScreenType, getBreakpoint } from 'lib/utils/get-screen-type';
import React, { useRef, useState } from 'react';
import ModalWrapper from 'src/helpers/ModalWrapper/ModalWrapper';
import Slider from 'react-slick';
import { getPhotoItemProps } from 'src/helpers/PhotoItemWithDetail/PhotoItemWithDetail.Utils';
import PhotoItemWithDetail, {
  PhotoItemWithDetailProps,
} from 'src/helpers/PhotoItemWithDetail/PhotoItemWithDetail';
import { SvgIcon } from 'src/helpers/SvgIcon';

export type CuratedImageDisplayProps =
  Feature.EnterpriseWeb.Components.General.CuratedImageDisplay.CuratedImageDisplay & {
    fields?: {
      images: Feature.EnterpriseWeb.Data.Photos.Photo[];
    };
  } & ComponentProps;

type displayStyle = 'grid' | 'horizontal-scroll';

const CuratedImageDisplay = (props: CuratedImageDisplayProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  const sliderRef = useRef<Slider>();

  const sliderSettings = {
    initialSlide: currentSlideIndex,
    focusOnSelect: true,
    arrows: false,
    dots: false,
  };

  const openModal = (index: number) => {
    setIsLightboxVisible(true);
    setCurrentSlideIndex(index);
  };

  const { themeData } = useTheme(CuratedImageDisplayTheme);
  const { currentScreenWidth } = useCurrentScreenType();

  const DESKTOP_DISPLAY_STYLE = getEnum<displayStyle>(props.fields?.desktopDisplayStyle) || 'grid';
  const MOBILE_DISPLAY_STYLE = getEnum<displayStyle>(props.fields?.mobileDisplayStyle) || 'grid';

  const renderCuratedImages = (): JSX.Element => {
    if (currentScreenWidth < getBreakpoint('md')) {
      // Renderings for mobile devices
      switch (MOBILE_DISPLAY_STYLE) {
        case 'grid':
          return gridStyleImages();
        case 'horizontal-scroll':
          return scrollStyleImage();
      }
    } else {
      // Renderings for tablets and large screen devices
      switch (DESKTOP_DISPLAY_STYLE) {
        case 'grid':
          return gridStyleImages();
        case 'horizontal-scroll':
          return scrollStyleImage();
      }
    }
  };

  const gridStyleImages = (): JSX.Element => {
    return (
      <ul className="grid grid-cols-2 gap-y-m md:grid-cols-12 md:gap-s">
        {props.fields?.images.map(
          (ImageItem: Feature.EnterpriseWeb.Data.Photos.Photo, index: number) => {
            return (
              <li
                tabIndex={0}
                key={index}
                onClick={() => {
                  openModal(index);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') openModal(index);
                }}
                className="group relative col-span-12 cursor-pointer md:col-span-4 lg:col-span-3"
              >
                <ImagePrimary
                  imageLayout={'responsive'}
                  ratio="square"
                  fields={{
                    primaryImageCaption: {
                      value: '',
                    },
                    primaryImage: ImageItem.fields?.thumbnailImage as ImageField,
                    primaryImageMobile: ImageItem.fields?.thumbnailImage as ImageField,
                  }}
                />
                <SvgIcon
                  className="-translate-t-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 rounded-full bg-black bg-opacity-[.65] p-l text-white opacity-0 transition-all ease-linear group-hover:-translate-y-1/2 group-hover:opacity-100"
                  icon="zoom-pinch"
                />
              </li>
            );
          }
        )}
      </ul>
    );
  };

  const scrollStyleImage = (): JSX.Element => {
    const sliderSettings = {
      dots: false,
      arrow: true,
      infinite: false,
      slidesToShow: 4,
      responsive: [
        {
          breakpoint: getBreakpoint('md'),
          settings: {
            slidesToShow: 1,
            dots: true,
          },
        },
        {
          breakpoint: getBreakpoint('lg'),
          settings: {
            slidesToShow: 3,
            dots: false,
          },
        },
      ],
    };

    return (
      <SliderWrapper sliderSettings={sliderSettings}>
        {props.fields?.images.map(
          (ImageItem: Feature.EnterpriseWeb.Data.Photos.Photo, index: number) => {
            return (
              <React.Fragment key={`ImageItem-${index}`}>
                <div
                  tabIndex={0}
                  onClick={() => {
                    openModal(index);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') openModal(index);
                  }}
                  className="group relative cursor-pointer md:mr-s"
                >
                  <ImagePrimary
                    imageLayout={'responsive'}
                    ratio="square"
                    fields={{
                      primaryImageCaption: {
                        value: '',
                      },
                      primaryImage: ImageItem.fields?.thumbnailImage as ImageField,
                      primaryImageMobile: ImageItem.fields?.thumbnailImage as ImageField,
                    }}
                  />
                  <SvgIcon
                    className="-translate-t-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 rounded-full bg-black bg-opacity-[.65] p-l text-white opacity-0 transition-all ease-linear group-hover:-translate-y-1/2 group-hover:opacity-100"
                    icon="zoom-pinch"
                  />
                </div>
              </React.Fragment>
            );
          }
        )}
      </SliderWrapper>
    );
  };

  return (
    <Component variant="lg" dataComponent="general/curatedimagedisplay" {...props}>
      <div className="col-span-12">
        <Headline {...props} classes={themeData.classes.headline} />
        <BodyCopy {...props} classes={themeData.classes.bodyCopy} />
        <SingleButton {...props} classes={themeData.classes.SingleButton} />
        {renderCuratedImages()}
        {/* Photo gallery */}
        {isLightboxVisible && (
          <ModalWrapper size="fluid" handleClose={() => setIsLightboxVisible(false)}>
            <div className="px-ml pb-ml pt-s">
              <SliderWrapper
                sliderSettings={sliderSettings}
                sliderRef={sliderRef as unknown as Slider}
              >
                {props.fields?.images?.map(
                  (result: Feature.EnterpriseWeb.Data.Photos.Photo, index: number) => {
                    const photoObject = getPhotoItemProps(
                      result,
                      false
                    ) as PhotoItemWithDetailProps;

                    return <PhotoItemWithDetail key={index} {...photoObject} />;
                  }
                )}
              </SliderWrapper>
              <div className="mt-m flex items-center justify-between text-xxs md:justify-center">
                <div
                  role="button"
                  className="ml-xxxs flex cursor-pointer items-center font-bold md:mr-xs"
                  onClick={() => sliderRef.current && sliderRef.current.slickPrev()}
                >
                  <SvgIcon className="mr-xs" icon="arrow-left" />

                  <Text field={props.fields?.previousLabel} tag="span" />
                </div>
                <div
                  role="button"
                  className="mr-xxxs flex cursor-pointer items-center font-bold md:ml-xs"
                  onClick={() => {
                    sliderRef.current && sliderRef.current.slickNext();
                  }}
                >
                  <Text field={props.fields?.nextLabel} tag="span" />
                  <SvgIcon className="ml-xs" icon="arrow-right" />
                </div>
              </div>
            </div>
          </ModalWrapper>
        )}
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<CuratedImageDisplayProps>(CuratedImageDisplay);
