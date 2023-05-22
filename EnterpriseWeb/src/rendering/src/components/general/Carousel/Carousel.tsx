// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { CarouselTheme } from './Carousel.theme';
import { Component } from 'src/helpers/Component';
import classNames from 'classnames';
import { Headline } from 'src/helpers/Headline';
import { Subheadline } from 'src/helpers/Subheadline';
import SingleButton from 'src/helpers/SingleButton/SingleButton';
import { RenderSlider } from './RenderSlider';
import { getEnum } from 'lib/utils';
import { ComponentProps } from 'lib/component-props';

export type CarouselProps = Feature.EnterpriseWeb.Components.General.Carousel.Carousel & {
  fields: {
    children: any;
  };
} & ComponentProps;

type paginationStyle = 'numbers' | 'dots';

const Carousel = (props: CarouselProps) => {
  const { themeData } = useTheme(CarouselTheme);
  const paginationStyle = getEnum<paginationStyle>(props.fields?.carouselStyle) || 'dots';
  const loop = props.fields?.loop?.value || true;
  const autoplay = props.fields?.autoPlay.value || false;
  const autoPlayInterval = props.fields?.interval.value || 2000;

  const sliderSettings = {
    dots: true,
    enableNumberedPagination: paginationStyle == 'numbers',
    slidesToShow: 1,
    infinite: loop,
    autoplay: autoplay,
    autoplaySpeed: autoPlayInterval,
    pauseOnFocus: true,
    pauseOnHover: true,
    dotsClass: 'slick-dots static',
  };

  return (
    <Component variant="lg" dataComponent="general/carousel" {...props}>
      <div className={classNames('col-span-12')}>
        <Headline classes={themeData.classes.headlineClass} {...props} />
        <Subheadline classes={themeData.classes.subHeadlineClass} {...props} />
        <RenderSlider slidesData={props.fields.children} sliderSettings={sliderSettings} />
        <SingleButton classes={themeData.classes.buttonClass} {...props} />
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<CarouselProps>(Carousel);
