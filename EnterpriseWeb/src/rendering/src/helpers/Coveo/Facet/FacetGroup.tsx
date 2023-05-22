import { ReactElement, useEffect, useState } from 'react';
import { Facet } from 'src/helpers/Coveo/Facet/Facet';
import {
  QuerySummaryState,
  BreadcrumbManager as HeadlessBreadcrumbTypings,
  QuerySummary,
} from '@coveo/headless/dist/definitions';
import ModalWrapper from 'src/helpers/ModalWrapper/ModalWrapper';
import { getBreakpoint, useCurrentScreenType } from 'lib/utils/get-screen-type';
import { coveoEngineInstances } from 'lib/context/CoveoEngine';
import { ThemeFile, ThemeName } from 'lib/context/ThemeContext';
import { SearchProps } from 'components/search/Search/Search';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { BreadcrumbManager } from '../BreadcrumbManager/BreadcrumbManager';
import { buildFacetConditionsManager } from '@coveo/headless';

interface FacetGroupProps {
  themeData: ThemeFile[ThemeName];
}
interface ShowFacetState {
  [facetId: string]: boolean;
}

const FacetGroup = (props: SearchProps & FacetGroupProps) => {
  const { fields, themeData } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queryState, setQueryState] = useState<QuerySummaryState>(
    coveoEngineInstances.searchPageEngine.controllers.querySummaryController
      .state as QuerySummaryState
  );

  const [showFacet, setShowFacet] = useState<ShowFacetState>({});
  const { currentScreenWidth } = useCurrentScreenType();

  useEffect(() => {
    const facetControllers = Object.values(
      coveoEngineInstances.searchPageEngine.controllers.facetController || {}
    );

    facetControllers.map(({ facet }) => {
      const facetId = facet.state.facetId;
      facet.subscribe(() =>
        setShowFacet((prevValues) => ({
          ...prevValues,
          [facetId]: facet.state.enabled,
        }))
      );
    });
  }, []);

  useEffect(() => {
    const unwatchFns = Object.values(
      coveoEngineInstances.searchPageEngine.controllers.facetController || {}
    )
      .filter(({ dependsOn }) => !!dependsOn)
      .map(({ facet, dependsOn }) => {
        const facetConditionsManager = buildFacetConditionsManager(
          coveoEngineInstances.searchPageEngine.headlessEngine,
          {
            facetId: facet.state.facetId,
            conditions: [
              {
                parentFacetId: dependsOn,
                condition: (parentValues) =>
                  parentValues.some((value) => value.state === 'selected'),
              },
            ],
          }
        );
        return facetConditionsManager.stopWatching;
      });

    return () => {
      unwatchFns.forEach((unwatch) => unwatch());
    };
  }, []);

  useEffect(() => {
    (
      coveoEngineInstances.searchPageEngine.controllers.querySummaryController as QuerySummary
    ).subscribe(() =>
      setQueryState(
        coveoEngineInstances.searchPageEngine.controllers.querySummaryController
          .state as QuerySummaryState
      )
    );
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const RenderFacets = (): ReactElement => {
    return (
      <div className={themeData.classes.facetClasses?.facetGroup.wrapper}>
        <BreadcrumbManager
          controller={
            coveoEngineInstances.searchPageEngine.controllers
              .breadcrumbManager as HeadlessBreadcrumbTypings
          }
          breadcrumbClasses={themeData.classes.breadcrumbClasses}
          facetSectionHeading={fields?.searchParameters.fields.facetSectionHeading}
          clearAllLabel={fields?.searchParameters.fields.clearAllLabel}
        />

        {Object.entries(showFacet).map(([facetId, showDependentFacet], index) => {
          return (
            showDependentFacet &&
            fields?.facets?.[index]?.fields && (
              <Facet
                key={`${facetId}${index}`}
                facetClasses={themeData.classes.facetClasses}
                controller={
                  Object.values(coveoEngineInstances.searchPageEngine.controllers.facetController)[
                    index
                  ]?.facet
                }
                facetLabel={fields?.facets[index]?.fields.facetLabel}
                showMoreLabel={fields?.searchParameters.fields.showMoreLabel}
                showLessLabel={fields?.searchParameters.fields.showLessLabel}
                searchLabel={fields?.searchParameters.fields.facetSearchLabel}
              />
            )
          );
        })}

        {currentScreenWidth < getBreakpoint('ml') && (
          <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center border-t border-gray py-s ">
            <button
              onClick={handleCloseModal}
              className={themeData.classes.facetClasses?.facetGroup.showResultCta}
            >
              {`${fields?.searchParameters.fields.showResultsLabel.value} (${queryState.total})`}
              <SvgIcon
                icon="arrow"
                className={themeData.classes.facetClasses?.facetGroup.showResultCtaIcon}
              />
            </button>
          </div>
        )}
      </div>
    );
  };

  if (currentScreenWidth < getBreakpoint('ml')) {
    return (
      <>
        <button
          onClick={handleOpenModal}
          className={themeData.classes.facetClasses?.facetGroup.filterCta}
        >
          {fields.searchParameters.fields.filtersLabel.value}
        </button>
        {isModalOpen && (
          <ModalWrapper handleClose={handleCloseModal} size="extra-large">
            {RenderFacets()}
          </ModalWrapper>
        )}
      </>
    );
  } else {
    return <>{RenderFacets()}</>;
  }
};

export default FacetGroup;
