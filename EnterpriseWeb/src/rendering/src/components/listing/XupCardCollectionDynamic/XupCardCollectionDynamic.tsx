// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { useSitecoreContext, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { Component } from 'src/helpers/Component';
import { Result } from '@coveo/headless';
import { CoveoEngine } from 'lib/context/CoveoEngine';
import {
  loadSearchAnalyticsActions,
  loadSearchActions,
  ResultListState,
  loadSearchConfigurationActions,
  loadQueryActions,
} from '@coveo/headless';

import { ResultList as ResultListTypings } from '@coveo/headless/dist/definitions';
import { ReactElement, useEffect, useRef, useState } from 'react';
import {
  GridStyle,
  registerTemplates,
} from 'src/helpers/Coveo/ResultTemplatesManager/ResultTemplatesManager';
import { getEnum } from 'lib/utils';
import Slider from 'react-slick';
import ModalWrapper from 'src/helpers/ModalWrapper/ModalWrapper';
import { SliderWrapper } from 'src/helpers/SliderWrapper';
import { getPhotoItemProps } from 'src/helpers/PhotoItemWithDetail/PhotoItemWithDetail.Utils';
import PhotoItemWithDetail, {
  PhotoItemWithDetailProps,
} from 'src/helpers/PhotoItemWithDetail/PhotoItemWithDetail';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { getBreakpoint, useCurrentScreenType } from 'lib/utils/get-screen-type';
import { XupDisplayStyle } from '../XupCardCollection/XupCardCollection';
import { Headline } from 'src/helpers/Headline';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { ButtonGroup } from 'src/helpers/ButtonGroup';
import { GridDisplay, SliderDisplay } from './DynamicXupDisplayModes';
import { XupCardCollectionDynamicTheme } from './XupCardCollectionDynamic.theme';
import { ComponentProps } from 'lib/component-props';

export type XupCardCollectionDynamicProps =
  Feature.EnterpriseWeb.Components.Listing.XupCardCollectionDynamic.XupCardCollectionDynamic & {
    fields?: {
      children: Feature.EnterpriseWeb.Components.Listing.XupCardCollectionDynamic.ResultItem[];
    };
  } & ComponentProps;

export type cardAlignment = 'left' | 'center';

const XupCardCollectionDynamic = (props: XupCardCollectionDynamicProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  const { currentScreenWidth } = useCurrentScreenType();

  const cardAlignment = getEnum<cardAlignment>(props.fields?.alignment) || 'left';
  const { themeData } = useTheme(XupCardCollectionDynamicTheme(cardAlignment));

  const context = useSitecoreContext();
  const sliderRef = useRef<Slider>();

  //#region initialise xupCoveoEngine, resultListState, registerTemplates
  const [xupCoveoEngine, setXupCoveoEngine] = useState<CoveoEngine>();
  const [resultListState, setResultListState] = useState<ResultListState>();

  const subscribeToStateChangesAndReturnCleanup = (
    xupCoveoEngine: CoveoEngine,
    unsubscribers: Array<any>
  ) => {
    unsubscribers?.push(
      (xupCoveoEngine.controllers.resultListController as ResultListTypings)?.subscribe(() =>
        setResultListState(
          xupCoveoEngine.controllers.resultListController?.state as ResultListState
        )
      )
    );
  };

  const fetchResultsFromStandaloneQuery = (xupCoveoEngine: CoveoEngine) => {
    const data = JSON.parse(localStorage.getItem('coveo_standalone_search_box_data') || '{}');

    if (data && data.value) {
      localStorage.removeItem('coveo_standalone_search_box_data');
      const { value, analytics } = data;

      const { cause, metadata } = analytics;

      const { logSearchFromLink, logOmniboxFromLink } = loadSearchAnalyticsActions(
        xupCoveoEngine.headlessEngine
      );

      const event = cause === 'searchFromLink' ? logSearchFromLink() : logOmniboxFromLink(metadata);
      dispatchQuery(xupCoveoEngine, true, value, event);
    } else {
      dispatchQuery(xupCoveoEngine, false);
    }
  };

  const dispatchQuery = (
    xupCoveoEngine: CoveoEngine,
    isStandaloneSearchQuery: boolean,
    query = '',
    event: any = ''
  ) => {
    const { executeSearch } = loadSearchActions(xupCoveoEngine.headlessEngine);

    if (isStandaloneSearchQuery) {
      const { updateQuery } = loadQueryActions(xupCoveoEngine.headlessEngine);

      xupCoveoEngine.headlessEngine.dispatch(updateQuery({ q: query }));
      xupCoveoEngine.headlessEngine.dispatch(executeSearch(event));
    } else {
      const { logInterfaceLoad } = loadSearchAnalyticsActions(xupCoveoEngine.headlessEngine);

      xupCoveoEngine.headlessEngine.dispatch(executeSearch(logInterfaceLoad()));
    }
  };

  useEffect(() => {
    const allunsubscribers: { (): void }[] = [];

    (async () => {
      try {
        const _xupCoveoEngine = await CoveoEngine.build();
        _xupCoveoEngine.initiateSearchEngine(
          props,
          context.sitecoreContext.site?.name ?? '',
          context.sitecoreContext.language ?? 'en',
          false,
          true
        );

        registerTemplates(
          _xupCoveoEngine.resultTemplateManager,
          themeData.classes.gridLayoutClasses,
          { fields: { gridResultItems: props.fields?.children } },
          'grid',
          getEnum<GridStyle>(props?.fields?.cardStyle)
        );

        const { updateSearchConfiguration } = loadSearchConfigurationActions(
          _xupCoveoEngine.headlessEngine
        );

        _xupCoveoEngine.headlessEngine.dispatch(
          updateSearchConfiguration({
            pipeline: props?.fields?.queryPipeline?.value,
            searchHub: props?.fields?.searchHub?.value,
          })
        );
        fetchResultsFromStandaloneQuery(_xupCoveoEngine);
        subscribeToStateChangesAndReturnCleanup(_xupCoveoEngine, allunsubscribers);
        setXupCoveoEngine(_xupCoveoEngine);
      } catch (error) {
        console.log('error ocuured', error);
        throw error;
      }
    })().catch((e) => {
      console.error(e);
    });

    return function cleanup() {
      allunsubscribers.forEach((unsub) => unsub?.());
    };
  }, []);

  //#endregion

  const desktopDisplayStyle = getEnum<XupDisplayStyle>(props.fields.desktopDisplayStyle) || 'grid';
  const mobileDisplayStyle = getEnum<XupDisplayStyle>(props.fields.mobileDisplayStyle) || 'grid';

  const maxCardsPerRow: number = parseInt(getEnum<string>(props.fields.cardsPerRow) || '3');

  const XupSliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: maxCardsPerRow,
    responsive: [
      {
        breakpoint: getBreakpoint('md'),
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  };

  const LightboxSliderSettings = {
    initialSlide: currentSlideIndex,
    arrows: false,
    dots: false,
  };

  // Render Xup cardcollection based XupDisplayStyle
  const renderCardColection = (): ReactElement => {
    if (currentScreenWidth < getBreakpoint('md')) {
      // Renderings for mobile devices
      if (mobileDisplayStyle === 'grid') {
        return <GridDisplay renderXupCard={renderXupCard} resultListState={resultListState} />;
      } else {
        return (
          <SliderDisplay
            sliderSettings={XupSliderSettings}
            renderXupCard={renderXupCard}
            resultListState={resultListState}
          />
        );
      }
    } else {
      // Renderings for tablets and large screen devices
      if (desktopDisplayStyle === 'grid') {
        return (
          <GridDisplay
            maxCardsPerRow={maxCardsPerRow}
            renderXupCard={renderXupCard}
            resultListState={resultListState}
          />
        );
      } else {
        return (
          <SliderDisplay
            sliderSettings={XupSliderSettings}
            renderXupCard={renderXupCard}
            resultListState={resultListState}
          />
        );
      }
    }
  };

  const NoResult = () => {
    if (!resultListState?.results?.length) {
      return (
        <div className="col-span-10">
          <BodyCopy
            classes={themeData.classes.bodyClass}
            fields={{ body: props.fields?.noResultsText }}
          />
        </div>
      );
    } else return <></>;
  };

  // use Coveo resultTemplteManager to choose and implement stytle of card
  const renderXupCard = (result: Result, index: number): ReactElement => {
    const template = xupCoveoEngine?.resultTemplateManager.selectTemplate(result);

    if (!template) throw new Error(`No result template provided for ${result.title}.`);

    return (
      <div
        tabIndex={0}
        onClick={() => {
          openModal(index);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') openModal(index);
        }}
        className="h-full"
      >
        {template(result)}
      </div>
    );
  };

  // handle opening the lightbox
  const openModal = (index: number) => {
    setIsLightboxVisible(true);
    setCurrentSlideIndex(index);
  };

  // renders photoGallery lightbox
  const photoGalleryLightbox = (): ReactElement | void => {
    if (getEnum<GridStyle>(props?.fields?.cardStyle) === 'photo-gallery' && isLightboxVisible) {
      return (
        <ModalWrapper size="fluid" handleClose={() => setIsLightboxVisible(false)}>
          <div className="px-ml pb-ml pt-s">
            {resultListState?.results && (
              <SliderWrapper
                sliderSettings={LightboxSliderSettings}
                sliderRef={sliderRef as unknown as Slider}
              >
                {resultListState?.results?.map((result) => {
                  let photoObject;
                  if (props.fields.children) {
                    photoObject = getPhotoItemProps(
                      result,
                      true,
                      props.fields.children || []
                    ) as PhotoItemWithDetailProps;

                    return <PhotoItemWithDetail key={result.uniqueId} {...photoObject} />;
                  } else return <></>;
                })}
              </SliderWrapper>
            )}
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
      );
    }
  };

  if (!props?.fields) {
    return <></>;
  }
  return (
    <Component variant="lg" dataComponent="listing/xupcardcollectiondynamic" {...props}>
      <div className="col-span-10">
        <Headline classes={themeData.classes.headlineClass} {...props} />
        <BodyCopy classes={themeData.classes.bodyClass} {...props} />
        <ButtonGroup classes={themeData.classes.buttonGroupClass} {...props} />
      </div>
      {xupCoveoEngine?.isEngineInitiated && (
        <>
          {/* {noResult()} */}
          <NoResult />
          {renderCardColection()}
          {photoGalleryLightbox()}
        </>
      )}
    </Component>
  );
};

export default withDatasourceCheck()<XupCardCollectionDynamicProps>(XupCardCollectionDynamic);
