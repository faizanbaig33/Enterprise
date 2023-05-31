import classNames from 'classnames';
import { ThemeName } from 'lib/context/ThemeContext';
import React, { ReactElement, useState } from 'react';
import Slider from 'react-slick';
import { SvgIcon } from '../SvgIcon';

type SliderWrapperProps = {
  theme?: ThemeName;
  sliderSettings?: any;
  sliderRef?: Slider;
  children: ReactElement[];
};

export const SliderWrapper = ({ sliderSettings, sliderRef, children }: SliderWrapperProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const renderIcon = (direction: 'left' | 'right') => {
    switch (direction) {
      case 'right':
        return <SvgIcon icon="arrow-right" size="lg" />;
      case 'left':
        return <SvgIcon icon="arrow-left" size="lg" />;
      default:
        return null;
    }
  };

  const ArrowIcon = (props: any) => {
    const { className, style, onClick, direction, classes } = props;
    return (
      <span
        className={classNames(className, 'text-theme-text hover:text-theme-text', classes)}
        style={{ ...style }}
        onClick={onClick}
      >
        {renderIcon(direction)}
      </span>
    );
  };

  const renderCustomPaging = (index: number) => {
    return (
      <span className={classNames(currentSlideIndex !== index && 'hidden')}>
        {index + 1} / {children.length}
      </span>
    );
  };

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowIcon direction="right" classes={sliderSettings?.nextArrowClasses} />,
    prevArrow: <ArrowIcon direction="left" classes={sliderSettings?.prevArrowClasses} />,
    afterChange: (currentIndex: number) => setCurrentSlideIndex(currentIndex),
    ...sliderSettings,
  };

  if (sliderSettings?.enableNumberedPagination) {
    settings.className = 'numbered-pagination';
    settings.dotsClass = sliderSettings.numberedPaginationClasses
      ? sliderSettings.numberedPaginationClasses
      : 'mt-xs text-center';
    settings.customPaging = (i: number) => {
      return renderCustomPaging(i);
    };
  }

  return (
    <Slider ref={sliderRef} {...settings}>
      {children}
    </Slider>
  );
};
