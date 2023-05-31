import React, { ReactElement, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { SliderWrapper } from 'src/helpers/SliderWrapper';
import { PlaceholderData } from '@sitecore-jss/sitecore-jss/layout';
import { useTheme } from 'lib/context/ThemeContext';
import { ProductCarouselTheme } from './ProductCarousel.theme';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { Url } from 'url';
import Slider from 'react-slick';
import ImageWrapper from 'src/helpers/Media/ImageWrapper';
type childItem = {
  url: Url;
  // eslint-disable-next-line @typescript-eslint/ban-types
  fields: any;
  placeholders: PlaceholderData;
};
type RenderingProps = {
  slidesData: childItem[];
  currentSlideIndex: number;
};

type RenderSliderProps = {
  sliderSettings: { [key: string]: any };
} & RenderingProps;
export const RenderSlider = ({
  currentSlideIndex,
  slidesData,
  sliderSettings,
}: RenderSliderProps): ReactElement => {
  const ref = useRef<Slider>();
  const { themeData } = useTheme(ProductCarouselTheme);
  return (
    <>
      <SliderWrapper sliderSettings={sliderSettings} sliderRef={ref as unknown as Slider}>
        {slidesData.map((item, idx) => (
          <div key={idx}>
            <div
              className={clsx({
                'product-slide-img-wrapper md:h-[370px] md:w-[210px]': true,
                'opacity-70': idx !== currentSlideIndex,
              })}
            >
              <Link href={item.fields.cta1Link.value.href}>
                <a>
                  <ImageWrapper
                    image={item.fields.carouselSlideImage}
                    additionalDesktopClasses="h-full w-full cursor-pointer"
                  />
                </a>
              </Link>
            </div>
            <div className="text-center">
              <Link href={item.fields.cta1Link.value.href}>
                <a className="md:text-md text-sm font-semibold uppercase hover:underline">
                  {item.fields.productName.value}
                </a>
              </Link>
              <p className="mt-2 text-sm">{item.fields.productBodyCopy.value}</p>
            </div>
          </div>
        ))}
      </SliderWrapper>
      <div className={themeData.classes.arrowPrevButtonWrapperClass}>
        <button
          className={themeData.classes.arrowButtonClass}
          onClick={() => ref?.current?.slickPrev()}
        >
          <SvgIcon icon="arrow-left" size="lg" />
        </button>
      </div>
      <div className={themeData.classes.arrowNextButtonWrapperClass}>
        <button
          className={themeData.classes.arrowButtonClass}
          onClick={() => ref?.current?.slickNext()}
        >
          <SvgIcon icon="arrow-right" size="lg" />
        </button>
      </div>
    </>
  );
};
