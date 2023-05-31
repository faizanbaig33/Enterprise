import classNames from 'classnames';
import React, { ReactElement } from 'react';
import { SliderWrapper } from 'src/helpers/SliderWrapper';
import { getLayoutClasses } from '../XupCardCollection/XupCardCollectionUtil';
import { Result, ResultListState } from '@coveo/headless';

type GridDisplayProps = {
  renderXupCard: (result: Result, index: number) => ReactElement;
  maxCardsPerRow?: number;
  resultListState: ResultListState | undefined;
};

type SliderDisplayProps = {
  sliderSettings: { [key: string]: any };
  renderXupCard: (result: Result, index: number) => ReactElement;
  resultListState: ResultListState | undefined;
};

export const GridDisplay = ({
  maxCardsPerRow,
  renderXupCard,
  resultListState,
}: GridDisplayProps) => {
  return (
    <>
      {resultListState?.results?.map((result, index) => (
        <div
          key={index}
          className={classNames(
            'col-span-12',
            maxCardsPerRow &&
              getLayoutClasses(resultListState?.results.length, index, maxCardsPerRow)
          )}
        >
          {renderXupCard(result, index)}
        </div>
      ))}
    </>
  );
};

export const SliderDisplay = ({
  sliderSettings,
  renderXupCard,
  resultListState,
}: SliderDisplayProps) => {
  return (
    <div className="col-span-12">
      {resultListState?.results && (
        <SliderWrapper sliderSettings={sliderSettings}>
          {resultListState?.results?.map((result, index) => (
            <div key={index} className={classNames('h-full md:px-xxs')}>
              {renderXupCard(result, index)}
            </div>
          ))}
        </SliderWrapper>
      )}
    </div>
  );
};
