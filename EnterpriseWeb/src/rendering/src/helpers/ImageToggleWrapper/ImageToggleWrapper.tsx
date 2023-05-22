import classNames from 'classnames';
import { Foundation } from 'src/.generated/Foundation.EnterpriseWeb.model';
import Slider from 'react-slick';
import { useEffect, useRef, useState } from 'react';
import ImageWrapper from '../Media/ImageWrapper';
import { RatioTypes, maxhTypes, maxwTypes } from '../Media';
import { ProductSwatch } from 'components/general/ProductIntro/ProductIntro';

export type ImageToggleWrapperProps = Foundation.EnterpriseWeb.Core.FieldSets.ImagePrimary &
  Foundation.EnterpriseWeb.Core.FieldSets.ImageSecondary & {
    ratio?: RatioTypes;
    maxH?: maxhTypes;
    maxW?: maxwTypes;
  } & {
    updateToggleState?: (state: boolean) => void;
    colorSwatches?: {
      interiorColorSwatches?: ProductSwatch[];
      exteriorColorSwatches?: ProductSwatch[];
    };
    selectedSwatchIndex?: number;
  };

const ImageToggleWrapper = (props: ImageToggleWrapperProps): JSX.Element => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { fields, ratio, maxW, maxH, updateToggleState, colorSwatches, selectedSwatchIndex } =
    props;

  const primaryImage = !!fields?.primaryImage?.value?.src
    ? {
        image: fields?.primaryImage,
        mobileImage: fields?.primaryImageMobile,
        mobileFocusArea: fields?.primaryImageMobileFocusArea,
        additionalDesktopClasses: 'w-fit mx-auto',
        additionalMobileClasses: 'w-fit mx-auto',
        ratio: ratio,
        maxW: maxW,
        maxH: maxH,
      }
    : false;

  const secondaryImage = !!fields?.secondaryImage?.value?.src
    ? {
        image: fields?.secondaryImage,
        mobileImage: fields?.secondaryImageMobile,
        mobileFocusArea: fields?.secondaryImageMobileFocusArea,
        additionalDesktopClasses: 'w-fit mx-auto',
        additionalMobileClasses: 'w-fit mx-auto',
        ratio: ratio,
        maxW: maxW,
        maxH: maxH,
      }
    : false;

  const activeButtonStyle =
    'text-regular inline-block rounded-full px-l py-[8px] text-small uppercase leading-tight border-2 border-black font-heavy text-secondary';
  const inactiveButtonStyle =
    'inline-block rounded-full px-l py-[8px] text-small uppercase leading-tight font-heavy text-dark-gray';

  const slider = useRef<Slider>(null);

  const sliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_currentSlide: number, nextSlide: number) => {
      setCurrentSlideIndex(nextSlide);
    },
  };

  useEffect(() => {
    if (selectedSwatchIndex != undefined && selectedSwatchIndex >= 0 && colorSwatches) {
      if (
        colorSwatches?.interiorColorSwatches &&
        currentSlideIndex < colorSwatches?.interiorColorSwatches?.length
      ) {
        slider?.current?.slickGoTo(selectedSwatchIndex);
      } else {
        slider?.current?.slickGoTo(
          colorSwatches?.interiorColorSwatches
            ? colorSwatches?.interiorColorSwatches?.length + selectedSwatchIndex
            : 0
        );
      }
    }
  }, [selectedSwatchIndex]);

  const imageSlider = (): JSX.Element => {
    if (
      colorSwatches &&
      colorSwatches?.exteriorColorSwatches?.length &&
      colorSwatches?.interiorColorSwatches?.length
    ) {
      return (
        <Slider ref={slider} {...sliderSettings} swipeToSlide={false} swipe={true}>
          {/* By default interior images will be the first */}
          {colorSwatches?.interiorColorSwatches?.map((swatchItem, index: number) => {
            return (
              <ImageWrapper
                key={`slideImage-${index}`}
                imageLayout="intrinsic"
                image={swatchItem.fields?.productImage}
                mobileImage={swatchItem.fields?.productImage}
                mobileFocusArea={fields?.primaryImageMobileFocusArea}
                additionalDesktopClasses="w-fit mx-auto"
                additionalMobileClasses="w-fit mx-auto"
                ratio={ratio}
                maxW={maxW}
                maxH={maxH}
              />
            );
          })}
          {colorSwatches?.exteriorColorSwatches?.map((swatchItem, index: number) => {
            return (
              <ImageWrapper
                key={`sliderImage-${index}`}
                imageLayout="intrinsic"
                image={swatchItem.fields?.productImage}
                mobileImage={swatchItem.fields?.productImage}
                mobileFocusArea={fields?.primaryImageMobileFocusArea}
                additionalDesktopClasses="w-fit mx-auto"
                additionalMobileClasses="w-fit mx-auto"
                ratio={ratio}
                maxW={maxW}
                maxH={maxH}
              />
            );
          })}
        </Slider>
      );
    } else {
      return (
        <Slider ref={slider} {...sliderSettings}>
          <ImageWrapper {...primaryImage} imageLayout="intrinsic" />
          <ImageWrapper {...secondaryImage} imageLayout="intrinsic" />
        </Slider>
      );
    }
  };

  return (
    <>
      {/* redner image toggle slider */}
      {imageSlider()}

      {/* Toggle Buttons */}
      {primaryImage && secondaryImage && (
        <div className={classNames('mt-m mb-m flex justify-center')}>
          <div className={classNames('relative rounded-full border border-gray text-center')}>
            <button
              className={classNames(
                colorSwatches?.interiorColorSwatches &&
                  currentSlideIndex < colorSwatches?.interiorColorSwatches?.length
                  ? activeButtonStyle
                  : inactiveButtonStyle
              )}
              onClick={() => {
                updateToggleState && updateToggleState(true);
                if (colorSwatches) {
                  slider?.current?.slickGoTo(0);
                } else {
                  slider?.current?.slickPrev();
                }
              }}
            >
              Interior
            </button>
            <button
              className={classNames(
                colorSwatches?.interiorColorSwatches &&
                  currentSlideIndex >= colorSwatches?.interiorColorSwatches.length
                  ? activeButtonStyle
                  : inactiveButtonStyle
              )}
              onClick={() => {
                updateToggleState && updateToggleState(false);
                if (colorSwatches) {
                  slider?.current?.slickGoTo(colorSwatches?.interiorColorSwatches?.length || 1);
                } else {
                  slider?.current?.slickNext();
                }
              }}
            >
              Exterior
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ImageToggleWrapper;
