import { Field, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

import React, { ReactElement, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { SliderWrapper } from 'src/helpers/SliderWrapper';
import { Caption } from 'src/helpers/Caption';
import { PlaceholderData } from '@sitecore-jss/sitecore-jss/layout';
import { useTheme } from 'lib/context/ThemeContext';
import { ProductCarouselTheme } from './ProductCarousel.theme';
import { LinkWrapper } from 'src/helpers/LinkWrapper';
import { Image } from 'src/helpers/Media';
import { SvgIcon } from 'src/helpers/SvgIcon';

type childItem = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  fields: any;
  placeholders: PlaceholderData;
};

type RenderingProps = {
  slidesData: childItem[];
  currentSlideIndex: Number;
};
type RenderSliderProps = {
  sliderSettings: { [key: string]: any };
} & RenderingProps;

export const RenderSlider = ({ currentSlideIndex, slidesData, sliderSettings }: RenderSliderProps): ReactElement => {
  const ref = useRef(null);
  const { themeData } = useTheme(ProductCarouselTheme);

  return (
    <>
      <SliderWrapper sliderSettings={sliderSettings} sliderRef={ref}>
        {slidesData.map(((item, idx) => (
          <div key={idx}>
            <div className={clsx({
              'sm:h-[250px] md:h-[370px] md:w-[210px] product-slide-img-wrapper': true,
              'opacity-70': idx !== currentSlideIndex
            })}>
            <Link href={item?.fields?.cta1Link?.value?.href} passHref>
              <a onClick={() => console.log(item?.fields?.cta1Link?.value?.href)}>
                <img src={item.fields.carouselSlideImage.value.src} layout="intrinsic" className='w-full h-full cursor-pointer' alt='product-slide-image' />
              </a>
            </Link>
            </div>
            <div className='text-center'>
              <Link href={item?.fields?.cta1Link?.value?.href} passHref>
                <a className='uppercase font-semibold hover:underline text-sm md:text-md'>{item.fields.productName.value}</a>
              </Link>
              <p className='text-sm mt-2'>{item.fields.productBodyCopy.value}</p>
            </div>
          </div>
        )))}
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
        <button className={themeData.classes.arrowButtonClass} onClick={() => ref?.current?.slickNext()}>
          <SvgIcon icon="arrow-right" size="lg" />
        </button>
      </div>
    </>
  );
};