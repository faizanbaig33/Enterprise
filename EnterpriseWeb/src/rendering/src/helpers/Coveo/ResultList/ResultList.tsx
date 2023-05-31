import { Result, ResultList as HeadlessResultList, ResultTemplatesManager } from '@coveo/headless';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { GridStyle, LayoutType } from '../ResultTemplatesManager/ResultTemplatesManager';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { SliderWrapper } from 'src/helpers/SliderWrapper';
import { coveoEngineInstances } from 'lib/context/CoveoEngine';
import PhotoItemWithDetail, {
  PhotoItemWithDetailProps,
} from 'src/helpers/PhotoItemWithDetail/PhotoItemWithDetail';
import ModalWrapper from 'src/helpers/ModalWrapper/ModalWrapper';
import { SvgIcon } from 'src/helpers/SvgIcon';
import Slider from 'react-slick';
import { getPhotoItemProps } from 'src/helpers/PhotoItemWithDetail/PhotoItemWithDetail.Utils';
interface ResultListProps {
  controller: HeadlessResultList;
  resultTemplatesManager: ResultTemplatesManager<(result: Result) => JSX.Element>;
  resultListClasses?: {
    [property: string]: string;
  };
  layoutType?: LayoutType;
  gridStyle?: GridStyle;
  columns?: Feature.EnterpriseWeb.Elements.Search.ResultColumn[];
  resultItems: Feature.EnterpriseWeb.Elements.Search.GridResultItem[] | undefined;
}

export const ResultList: FunctionComponent<ResultListProps> = (props) => {
  const { controller, resultTemplatesManager, layoutType, gridStyle, columns, resultItems } = props;
  const [state, setState] = useState(controller.state);

  //#region Grid layout variables, states and functions

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  const sliderRef = useRef<Slider>();

  const sliderSettings = {
    initialSlide: currentSlideIndex,
    arrows: false,
    dots: false,
  };

  const openModal = (index: number) => {
    setIsLightboxVisible(true);
    setCurrentSlideIndex(index);
  };

  //#endregion

  useEffect(
    () =>
      controller.subscribe(() => {
        setState(controller.state);
      }),
    [controller]
  );

  return (
    <div>
      {/* Render columns if current layout is table. p.s. Document list has the table layout */}
      {layoutType === 'table' && (
        <ul className="hidden ml:flex">
          {columns?.map((column, index) => {
            return (
              <li
                key={index}
                className={classNames(
                  index === 0 ? 'basis-4/5' : 'basis-1/5',
                  props.resultListClasses?.itemTitle
                )}
              >
                {column.fields?.displayName.value}
              </li>
            );
          })}
        </ul>
      )}
      {layoutType === 'grid' ? (
        <>
          <div className="grid gap-s md:grid-cols-12 md:gap-s">
            {state.results.map((result, index) => {
              const template = resultTemplatesManager.selectTemplate(result);

              if (!template) throw new Error(`No result template provided for ${result.title}.`);

              const isFacetsAvailable = Boolean(
                Object.keys(
                  coveoEngineInstances.searchPageEngine.controllers['facetController'] || {}
                ).length
              );

              return (
                <div
                  tabIndex={0}
                  key={result.uniqueId}
                  className={classNames(
                    'col-span-12 h-full',
                    isFacetsAvailable ? 'md:col-span-4' : 'md:col-span-3'
                  )}
                  onClick={() => {
                    openModal(index);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') openModal(index);
                  }}
                >
                  {template(result)}
                </div>
              );
            })}
          </div>
          {/* Photo gallery */}
          {gridStyle === 'photo-gallery' && isLightboxVisible && (
            <ModalWrapper size="fluid" handleClose={() => setIsLightboxVisible(false)}>
              <div className="px-ml pb-ml pt-s">
                <SliderWrapper
                  sliderSettings={sliderSettings}
                  sliderRef={sliderRef as unknown as Slider}
                >
                  {state.results.map((result) => {
                    let photoObject;
                    if (resultItems) {
                      photoObject = getPhotoItemProps(
                        result,
                        true,
                        resultItems
                      ) as PhotoItemWithDetailProps;

                      return <PhotoItemWithDetail key={result.uniqueId} {...photoObject} />;
                    } else return <></>;
                  })}
                </SliderWrapper>
                <div className="mt-m flex items-center justify-between text-xxs md:justify-center">
                  <div
                    role="button"
                    className="ml-xxxs flex cursor-pointer items-center font-bold md:mr-xs"
                    onClick={() => sliderRef.current && sliderRef.current.slickPrev()}
                  >
                    <SvgIcon className="mr-xs" icon="arrow-left" />
                    <span>Previous</span>
                  </div>
                  <div
                    role="button"
                    className="mr-xxxs flex cursor-pointer items-center font-bold md:ml-xs"
                    onClick={() => {
                      sliderRef.current && sliderRef.current.slickNext();
                    }}
                  >
                    <span>Next</span>
                    <SvgIcon className="ml-xs" icon="arrow-right" />
                  </div>
                </div>
              </div>
            </ModalWrapper>
          )}
        </>
      ) : (
        <ul>
          {state.results.map((result) => {
            const template = resultTemplatesManager.selectTemplate(result);
            if (!template) throw new Error(`No result template provided for ${result.title}.`);
            return template(result);
          })}
        </ul>
      )}
    </div>
  );
};
