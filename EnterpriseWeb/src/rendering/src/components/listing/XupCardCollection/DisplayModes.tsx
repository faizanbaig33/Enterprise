import { ComponentRendering, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import React from 'react';
import { SliderWrapper } from 'src/helpers/SliderWrapper';

type FavoriteProducts = {
  favoriteProducts: string[];
};
type RenderingProps = {
  rendering: ComponentRendering;
};

type GridDisplayProps = {
  getLayoutClasses?: (numberOfCards: number, currentIndex: number) => string;
} & RenderingProps &
  FavoriteProducts;

type SliderDisplayProps = {
  sliderSettings: { [key: string]: any };
} & RenderingProps &
  FavoriteProducts;

export const GridDisplay = ({
  rendering,
  getLayoutClasses,
  favoriteProducts,
}: GridDisplayProps) => {
  return (
    <Placeholder
      name="cards"
      rendering={rendering}
      favoriteProducts={favoriteProducts}
      render={(cards) =>
        cards.map((card, index) => (
          <div
            key={index}
            className={classNames(
              'col-span-12',
              getLayoutClasses && getLayoutClasses(cards.length, index)
            )}
          >
            {card}
          </div>
        ))
      }
    />
  );
};

export const SliderDisplay = ({
  rendering,
  sliderSettings,
  favoriteProducts,
}: SliderDisplayProps) => {
  return (
    <div className="col-span-12">
      <Placeholder
        name="cards"
        rendering={rendering}
        favoriteProducts={favoriteProducts}
        render={(cards) => (
          <SliderWrapper sliderSettings={sliderSettings}>
            {cards.map((card, index) => (
              <div key={index} className={classNames('h-full md:px-xxs')}>
                {card}
              </div>
            ))}
          </SliderWrapper>
        )}
      />
    </div>
  );
};
