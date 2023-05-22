// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { Field, Text, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { Component } from 'src/helpers/Component';
import { TabsFeaturedPromoTheme } from './TabsFeaturedPromo.theme';
import { ComponentProps } from 'lib/component-props';
import { Tabs } from 'src/helpers/Tabs';
import { Headline } from 'src/helpers/Headline';
import React, { useEffect, useRef, useState } from 'react';
import Promo from './Promo';
import { SvgIcon } from 'src/helpers/SvgIcon';
import classNames from 'classnames';
import { ItemExt } from 'lib/_.Sitecore.Override';
import ToggleSwitch from 'src/helpers/ToggleSwitch/ToggleSwitch';
import { getBreakpoint, useCurrentScreenType } from 'lib/utils/get-screen-type';
import { normalizeGuid } from 'lib/utils/string-utils';

type TabItemsProps = {
  fields: {
    tabItems: Array<Feature.EnterpriseWeb.Elements.Tabs.TabContent>;
    headlineLevel: ItemExt;
    headlineText: Field<string>;
  };
};

type TabCollectionsProps = {
  fields: {
    tabCollections: Array<Feature.EnterpriseWeb.Elements.Tabs.TabCollection & TabItemsProps>;
  };
};

export type TabsFeaturedPromoProps =
  Feature.EnterpriseWeb.Components.Tabs.TabsFeaturedPromo.TabsFeaturedPromo &
    TabCollectionsProps &
    ComponentProps;

const TabsFeaturedPromo = (props: TabsFeaturedPromoProps) => {
  const { fields } = props;
  const { tabCollections } = fields;

  const { themeName, themeData } = useTheme(TabsFeaturedPromoTheme);
  const { currentScreenWidth } = useCurrentScreenType();

  const titlesScroller = useRef<HTMLDivElement>(null);

  //#region initial states and data of tabs

  // ToggleSwitch
  const [activeSwitchIndex, setActiveSwitchIndex] = useState(0);
  //Sets visible tab group
  const [visiblePanelIndex, setVisiblePanelIndex] = useState(0);
  //Sets visible tab panel
  const [currentIndex, setCurrentIndex] = useState(-1);

  //#endregion

  useEffect(() => {
    const selectedId = window.location.hash;

    if (selectedId || fields.defaultActiveTab) {
      for (let collectionIndex = 0; collectionIndex < tabCollections.length; collectionIndex++) {
        let isMatchFound = false;
        for (
          let itemIndex = 0;
          itemIndex < tabCollections[collectionIndex].fields.tabItems.length;
          itemIndex++
        ) {
          if (selectedId) {
            const item = tabCollections[collectionIndex].fields.tabItems[itemIndex];
            const idToCompare = item.fields.contentId.value || `tab-${normalizeGuid(item.id)}`;

            if (selectedId.split('#')[1] === idToCompare) {
              setActiveSwitchIndex(collectionIndex);
              setVisiblePanelIndex(collectionIndex);
              setCurrentIndex(itemIndex);
              isMatchFound = true;
              break;
            }
          } else if (
            tabCollections[collectionIndex].fields.tabItems[itemIndex].fields.contentId.value ===
            (fields.defaultActiveTab as Feature.EnterpriseWeb.Elements.Tabs.TabContent)?.fields
              .contentId.value
          ) {
            setActiveSwitchIndex(collectionIndex);
            setVisiblePanelIndex(collectionIndex);
            setCurrentIndex(itemIndex);
            isMatchFound = true;
            break;
          }
        }
        if (isMatchFound) break;
      }
    } else setCurrentIndex(0);
  }, []);

  // get the tab title appear into view if the tabs are in scrollable section
  useEffect(() => {
    const selectedItem = fields.tabCollections[visiblePanelIndex]?.fields.tabItems[currentIndex];

    const selectedItemId =
      selectedItem?.fields.contentId.value || `tab-${normalizeGuid(selectedItem?.id)}`;

    if (currentIndex >= 0) {
      history.pushState(null, window.location.href, `#${selectedItemId}`);
    }

    if (titlesScroller.current && currentScreenWidth <= getBreakpoint('ml')) {
      // We're using ref of the parent node of the titles in order to avoid bugs which can occur
      // if this component is authored multiple times in single page
      titlesScroller.current
        .querySelector(`[id='tab-${selectedItemId}']`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [visiblePanelIndex, currentIndex]);

  const getSwitchTitles = (): string[] => {
    const switchTitles = ['', ''];

    tabCollections.forEach(
      (collection: Feature.EnterpriseWeb.Elements.Tabs.TabCollection, index: number) => {
        switchTitles[index] = (collection?.fields?.mobileToggleTitle as Field<string>).value;
      }
    );

    return switchTitles;
  };

  const selectTab = (itemIndex: number, collectionIndex: number) => {
    setCurrentIndex(itemIndex);
    setVisiblePanelIndex(collectionIndex);
  };

  const renderToggleSwitch = () => {
    if (currentScreenWidth <= getBreakpoint('ml')) {
      return (
        <ToggleSwitch
          switchTitles={getSwitchTitles()}
          activeSwitchIndex={activeSwitchIndex}
          toggleActiveSwtich={() => {
            const _activeSwitchIndex = activeSwitchIndex === 0 ? 1 : 0;
            setVisiblePanelIndex(_activeSwitchIndex);
            setActiveSwitchIndex(_activeSwitchIndex);
            setCurrentIndex(0);
          }}
        />
      );
    }
    return null;
  };

  const renderTitles = (
    collection: Feature.EnterpriseWeb.Elements.Tabs.TabCollection,
    collectionIndex: number
  ) => {
    if (
      (currentScreenWidth <= getBreakpoint('ml') && collectionIndex === visiblePanelIndex) ||
      currentScreenWidth > getBreakpoint('ml')
    ) {
      return (
        <>
          <div className={themeData.classes.tabsClasses.tabHeadlineWrapper}>
            {themeName === 'aw' && (
              <SvgIcon
                icon="orange-triangle"
                className={themeData.classes.tabsClasses.tabHeadlineIcon}
              />
            )}
            <Headline
              fields={collection.fields}
              classes={themeData.classes.tabsClasses.tabHeadline}
            />
          </div>
          <div ref={titlesScroller} className={themeData.classes.tabsClasses.tabTitlesContainer}>
            {currentIndex > 0 && (
              <div
                className={themeData.classes.tabsClasses.leftArrowIcon}
                onClick={() => setCurrentIndex(currentIndex - 1)}
              >
                <SvgIcon icon="arrow-left" />
              </div>
            )}
            <ul className={themeData.classes.tabsClasses.tabTitlesWrapper} key={collectionIndex}>
              {collection.fields.tabItems.map(
                (item: Feature.EnterpriseWeb.Elements.Tabs.TabContent, itemIndex: number) => {
                  return (
                    <li
                      key={itemIndex}
                      id={item.fields.contentId.value || `tab-${normalizeGuid(item.id)}`}
                      className={classNames(
                        themeData.classes.tabsClasses.tabTitle,
                        itemIndex === currentIndex &&
                          collectionIndex === visiblePanelIndex &&
                          themeData.classes.tabsClasses.activeTabTitle
                      )}
                      onClick={() => selectTab(itemIndex, collectionIndex)}
                      onKeyDown={(e) => {
                        if (e.code === 'Enter' || e.code === 'Space') {
                          selectTab(itemIndex, collectionIndex);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                    >
                      <Text tag="h4" field={item.fields.tabTitle as Field<string>} />
                    </li>
                  );
                }
              )}
            </ul>
            {currentIndex < collection.fields.tabItems.length - 1 && (
              <div
                className={themeData.classes.tabsClasses.rightArrowIcon}
                onClick={() => setCurrentIndex(currentIndex + 1)}
              >
                <SvgIcon icon="arrow-right" />
              </div>
            )}
          </div>
        </>
      );
    }

    return null;
  };

  if (!fields) return null;

  const renderTabTitles = () => {
    return (
      <>
        {/* Toggle Switch */}
        {tabCollections.length > 1 && (
          <div className={themeData.classes.tabsClasses.toggleContainer}>
            {renderToggleSwitch()}
          </div>
        )}
        {/* Tab Titles List */}
        {tabCollections.map(
          (
            collection: Feature.EnterpriseWeb.Elements.Tabs.TabCollection,
            collectionIndex: number
          ) => {
            return <>{renderTitles(collection, collectionIndex)}</>;
          }
        )}
      </>
    );
  };

  const renderTabPanels = (): React.ReactElement[] => {
    const panels: Array<React.ReactElement> = [];
    tabCollections.map(
      (collection: Feature.EnterpriseWeb.Elements.Tabs.TabCollection, collectionIndex: number) => {
        return (
          collectionIndex === visiblePanelIndex &&
          collection.fields.tabItems.forEach(
            (tabItem: Feature.EnterpriseWeb.Elements.Tabs.TabContent) => {
              panels.push(<Promo classes={themeData.classes.promoClasses} {...tabItem} />);
            }
          )
        );
      }
    );

    return panels;
  };

  return (
    <Component variant="lg" dataComponent="promo/tabsfeaturedpromo" {...props}>
      <div className="col-span-12">
        <Headline fields={fields} classes={themeData.classes.headline} />
      </div>
      <div className="col-span-12">
        <Tabs classes={themeData.classes.tabsClasses} currentTabIndex={currentIndex}>
          {renderTabTitles()}
          {renderTabPanels()}
        </Tabs>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<TabsFeaturedPromoProps>(TabsFeaturedPromo);
