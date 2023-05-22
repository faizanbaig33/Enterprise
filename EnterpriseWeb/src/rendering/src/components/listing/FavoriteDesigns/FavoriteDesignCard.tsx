import React, { useState } from 'react';
import { ButtonGroup } from 'src/helpers/ButtonGroup';
import { Headline } from 'src/helpers/Headline';
import { ImageToggleWrapper } from 'src/helpers/ImageToggleWrapper';
import { getButtonGroupData, getImageToggleData } from './FavoriteDesigns.Utils';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { getBreakpoint, useCurrentScreenType } from 'lib/utils/get-screen-type';
import { DesignProps } from './FavoriteDesigns.Types';
import { getLocalStorageItem, setLocalStorageItem } from 'lib/utils/client-storage-utils';
import classNames from 'classnames';

const FavoriteDesignCard = (props: DesignProps) => {
  const [isFavoriteDesign, setIsFavoriteDesign] = useState(true);
  const { currentScreenWidth } = useCurrentScreenType();

  const updateFavoriteStatus = () => {
    let designs = getLocalStorageItem('aw_favoritedesigns') as Array<DesignProps>;
    if (isFavoriteDesign) {
      designs = designs.filter(
        (designItem) => JSON.stringify(designItem) !== JSON.stringify(props)
      );
    } else designs.push(props);
    setLocalStorageItem('aw_favoritedesigns', designs);
    setIsFavoriteDesign(!isFavoriteDesign);
  };

  return (
    <div className="grid-rows-auto relative grid grid-cols-12 gap-y-0 p-s py-s md:max-w-screen-lg md:grid-flow-row-dense md:grid-cols-12 md:gap-s md:px-0 lg:mx-auto">
      {/* Favorite icon */}
      <div className="absolute top-0 right-0" onClick={() => updateFavoriteStatus()}>
        <div
          className={classNames(
            'favorite-product absolute right-0 top-0 inline h-0 w-0 cursor-pointer border-t-0 border-l-0 border-r-[60px] border-b-[60px] border-solid transition-[border-color]  duration-500 ease-[ease]',
            isFavoriteDesign
              ? 'border-[transparent_#F26924_transparent_transparent]'
              : 'border-[transparent_#C4BFB6_transparent_transparent]'
          )}
        >
          <span className="absolute -right-[51px] top-[11px]">
            <svg
              role="img"
              width="20"
              height="20"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Favorite Icon</title>
              <path
                d="M9.26884 16L8.37389 15.1924C6.83137 13.7808 5.55806 12.5621 4.55397 11.5362C3.54988 10.5102 2.74951 9.59345 2.15288 8.78581C1.55624 7.97817 1.13787 7.24693 0.897761 6.59209C0.657652 5.93724 0.537598 5.27513 0.537598 4.60573C0.537598 3.29604 0.977798 2.201 1.8582 1.3206C2.7386 0.4402 3.82637 0 5.1215 0C5.95097 0 6.71859 0.196453 7.42436 0.589359C8.13014 0.982265 8.74496 1.5498 9.26884 2.29195C9.88003 1.50614 10.5276 0.927694 11.2115 0.556617C11.8955 0.185539 12.6304 0 13.4162 0C14.7113 0 15.7991 0.4402 16.6795 1.3206C17.5599 2.201 18.0001 3.29604 18.0001 4.60573C18.0001 5.27513 17.88 5.93724 17.6399 6.59209C17.3998 7.24693 16.9814 7.97817 16.3848 8.78581C15.7882 9.59345 14.9878 10.5102 13.9837 11.5362C12.9796 12.5621 11.7063 13.7808 10.1638 15.1924L9.26884 16Z"
                fill="white"
              ></path>
            </svg>
          </span>
        </div>
      </div>
      {currentScreenWidth >= getBreakpoint('md') && (
        <div className="col-span-12 md:col-span-4">
          <ImageToggleWrapper {...getImageToggleData(props)} />
        </div>
      )}
      <div className="col-span-12 md:col-span-7">
        <div className="mb-m flex flex-col justify-between border-b border-gray px-xxs md:mb-0 md:flex-row md:px-0">
          <Headline
            classes="font-heavy text-xs md:text-s pb-xxs"
            fields={{
              headlineText: { value: props.seriesCategory },
              superscriptCTA: { value: {} },
            }}
          />
          <div className="a2a_kit a2a_kit_size_32 a2a_default_style mb-xxs cursor-pointer md:mb-0">
            <a
              className="a2a_dd flex items-center justify-center text-darkprimary"
              href="https://www.addtoany.com/share"
            >
              <SvgIcon icon="share" />
              <span className="ml-xxs">Share</span>
            </a>
          </div>
          {/* Placeholder for description */}
        </div>
        {currentScreenWidth <= getBreakpoint('md') && (
          <div className="col-span-12  md:col-span-4">
            <ImageToggleWrapper {...getImageToggleData(props)} />
          </div>
        )}
        <div className="design-summary pb-m md:py-m">
          <Headline
            classes="font-heavy text-sm-xs md:text-xs pb-s md:pb-m"
            fields={{
              headlineText: { value: 'Design Summary' },
              superscriptCTA: { value: {} },
            }}
          />
          <div className="selections flex flex-col flex-wrap md:flex-row">
            {props.selections.map((item: any) => {
              return (
                item.title !== 'Product ID#' && (
                  <div className="flex items-center md:basis-1/2 md:pb-xxs">
                    <div className="basis-1/2 font-sans text-small font-heavy md:text-xxs md:leading-none">
                      {item.title}
                    </div>
                    <div className="basis-1/2 text-small md:text-body">{item.value}</div>
                  </div>
                )
              );
            })}
          </div>
        </div>
        <ButtonGroup
          classes={{
            wrapper: 'flex-col md:items-center',
            cta1Classes: 'mr-2',
            cta2Classes: 'my-s md:my-0 !ml-0',
          }}
          {...getButtonGroupData(props)}
        />
      </div>
    </div>
  );
};

export default FavoriteDesignCard;
