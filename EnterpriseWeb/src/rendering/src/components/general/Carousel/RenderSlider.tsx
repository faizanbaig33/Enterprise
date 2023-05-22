import { Field, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

import React, { ReactElement } from 'react';
import { SliderWrapper } from 'src/helpers/SliderWrapper';
import { Caption } from 'src/helpers/Caption';
import { PlaceholderData } from '@sitecore-jss/sitecore-jss/layout';
import { useTheme } from 'lib/context/ThemeContext';
import { CarouselTheme } from './Carousel.theme';

type childItem = {
  fields: {
    caption: Field<string>;
  };
  placeholders: PlaceholderData;
};

type RenderingProps = {
  slidesData: childItem[];
};
type RenderSliderProps = {
  sliderSettings: { [key: string]: any };
} & RenderingProps;

export const RenderSlider = ({ slidesData, sliderSettings }: RenderSliderProps): ReactElement => {
  const { themeData } = useTheme(CarouselTheme);
  return (
    <>
      <SliderWrapper sliderSettings={sliderSettings}>
        {slidesData.map((childItem: any, index: number) => {
          return (
            <Placeholder
              key={index}
              name="components"
              rendering={childItem}
              render={(childComponents) => {
                return childComponents.map((component, index) => (
                  <div key={index}>
                    <div className="[&_.section-grid]:px-0">{component}</div>
                    <Caption {...childItem.fields} classes={themeData.classes.slideCaption} />
                  </div>
                ));
              }}
            />
          );
        })}
      </SliderWrapper>
    </>
  );
};
