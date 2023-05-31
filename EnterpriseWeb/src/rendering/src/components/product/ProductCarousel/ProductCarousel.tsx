// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import React, { useState } from 'react';
// Components
import { Component } from 'src/helpers/Component';
import { ProductCarouselTheme } from './ProductCarousel.theme';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { Headline } from 'src/helpers/Headline';
import { RenderSlider } from './RenderProductSlider';
import { ComponentProps } from 'lib/component-props';
import { Button } from 'src/helpers/Button';

export type ProductCarouselProps = Feature.EnterpriseWeb.Components.Product.ProductCarousel & {
  fields?: {
    children?: Feature.EnterpriseWeb.Components.Product.ProductCarouselSlide;
  };
} & ComponentProps;

const ProductCarousel = (props: ProductCarouselProps) => {
  const { themeData } = useTheme(ProductCarouselTheme);
  const slidesData = props.fields.children;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const sliderSettings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '100px',
    dots: true,
    arrows: false,
    slidesToShow: 5,
    variableWidth: true,
    enableNumberedPagination: false,
    pauseOnFocus: true,
    pauseOnHover: true,
    dotsClass: 'slick-dots static',
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          // slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          // slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (_currentSlide: number, nextSlide: number) => {
      setCurrentSlideIndex(nextSlide);
    },
  };

  return (
    <Component variant="lg" gap="" dataComponent="general/productcarousel" {...props}>
      <div className={themeData.classes.columnClass}>
        <div>
          <Headline defaultTag="h2" {...props} />
          <BodyCopy {...props} />
        </div>
        <RenderSlider
          currentSlideIndex={currentSlideIndex}
          slidesData={slidesData}
          sliderSettings={sliderSettings}
        />
        <div className={themeData.classes.exploreButtonClass}>
          <div>
            <Button
              field={props?.fields.cta1Link}
              variant={props?.fields.cta1Style}
              icon={props?.fields.cta1Icon}
              classes={props?.fields.cta1Style}
            ></Button>
          </div>
        </div>
      </div>
    </Component>
  );
};
export default withDatasourceCheck()<ProductCarouselProps>(ProductCarousel);
