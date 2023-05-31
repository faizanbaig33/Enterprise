// Global
import { useEffect, useState, useRef } from 'react';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { Placeholder, withDatasourceCheck, Text } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { Component } from 'src/helpers/Component';
import { HeroProductTabsTheme } from './HeroProductTabs.theme';
import { Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import classNames from 'classnames';
import { SliderWrapper } from 'src/helpers/SliderWrapper';
import { useCurrentScreenType } from 'lib/utils/get-screen-type';

export type HeroProductTabsProps =
  Feature.EnterpriseWeb.Components.Hero.HeroProductTabs.HeroProductTabs;
const HeroProductTabs = (props: HeroProductTabsProps) => {
  const { fields } = props;
  resetIdCounter();
  const slidesToShow = 2;
  const initialSlide = 0;
  const numberOfTabs = props.fields?.children.length;

  const componentRef = useRef<HTMLDivElement>(null);
  const getHashAnchor = (): number => {
    let hashedTabIndex = -1;
    if (typeof window !== 'undefined' && window.location.hash !== '') {
      const hash = window.location.hash.replace('#', '');
      hashedTabIndex = props.fields?.children.findIndex((child: HeroProductTabsProps) => {
        return child.id === hash || child.fields?.contentId?.value === hash;
      });
    }
    return hashedTabIndex;
  };

  let defaultTab = 0;
  const hashedTab = getHashAnchor();
  if (hashedTab > -1) {
    defaultTab = hashedTab;
  } else if (!!props.fields?.defaultActiveTab) {
    const defaultTabIndex = props.fields?.children.findIndex((child: HeroProductTabsProps) => {
      return child.id === props.fields?.defaultActiveTab?.id;
    });
    defaultTab = defaultTabIndex > 0 ? defaultTabIndex : defaultTab;
  }

  const { screenType } = useCurrentScreenType();

  useEffect(() => {
    function handleWindowResize() {
      // set specific height of slick-track so tabs can fill height based on other tabs content
      document.querySelectorAll<HTMLElement>('.heroproducttabs .slick-track').forEach((track) => {
        track.style.height = track.offsetHeight.toString() + 'px';
      });
    }

    window.addEventListener('resize', handleWindowResize);

    if (getHashAnchor() > -1 && componentRef.current) {
      componentRef.current.scrollIntoView();
    }
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const sliderSettings = {
    infinite: false,
    speed: 500,
    initialSlide: initialSlide,
    slidesToShow: numberOfTabs > slidesToShow ? slidesToShow : 2,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    variableWidth: true,
    className: 'heroproducttabs',
  };

  const TabHeading = ({ onClick, children, index }: HeroProductTabsProps) => {
    return (
      <div
        className={classNames(
          themeData.classes.tabs.commonTabHeadingClass,
          index === tabIndex
            ? themeData.classes.tabs.selectedTabHeadingClass
            : themeData.classes.tabs.unselectedTabHeadingClass
        )}
        onClick={onClick}
      >
        {children}
      </div>
    );
  };
  TabHeading.tabsRole = 'Tab';

  const [tabIndex, setTabIndex] = useState(defaultTab);

  const { themeData } = useTheme(HeroProductTabsTheme(screenType ?? 'sm', numberOfTabs));

  const isStickyTabonPage = fields.sticky.value;
  // Sticky Tabs
  useEffect(() => {
    if (isStickyTabonPage) {
      window.addEventListener('scroll', isStickyTabs);
    }
    return () => {
      if (isStickyTabonPage) {
        window.removeEventListener('scroll', isStickyTabs);
      }
    };
  });
  const isStickyTabs = () => {
    const heroproducttabsClass = document.querySelector('.heroproducttabs-wrapper') as HTMLElement;
    const utilityNav = document.querySelector('.utility-nav') as HTMLElement;
    const mainNav = document.querySelector('.main-nav') as HTMLElement;
    const mobileHeader = document.querySelector('.mobile-header') as HTMLElement;
    const mainDiv = document.querySelector('main') as HTMLElement;
    const scrollTop = window.scrollY;
    if (scrollTop >= 10) {
      heroproducttabsClass.classList.add('fixed');
      heroproducttabsClass.classList.add('top-0');
      utilityNav.classList.add('hidden');
      mainNav.classList.remove('fixed');
      mainNav.classList.add('static');
      mobileHeader.classList.remove('fixed');
      mobileHeader.classList.add('static');
      if (screenType === 'md' || screenType === 'sm') {
        mainDiv.style.paddingTop = '0';
      }
    } else {
      heroproducttabsClass.classList.remove('fixed');
      heroproducttabsClass.classList.remove('top-0');
      utilityNav.classList.remove('hidden');
      mainNav.classList.remove('static');
      mobileHeader.classList.remove('static');
      mobileHeader.classList.add('fixed');
      if (screenType === 'md' || screenType === 'sm') {
        mainDiv.style.paddingTop = '55px';
      }
    }
  };

  if (!fields) return null;

  return (
    <Component padding={'0'} variant="full" dataComponent="hero/heroproducttabs" {...props}>
      <div className=" col-span-12" ref={componentRef}>
        <Tabs selectedIndex={tabIndex} onSelect={(index: number) => setTabIndex(index)}>
          <div className="heroproducttabs-wrapper z-[70] w-full border-b border-b-gray bg-white">
            <div className="flex w-full flex-col items-center justify-between ml:flex-row ml:px-m lg:mx-auto lg:max-w-screen-lg">
              <div className="w-full ml:w-[50%]">
                <Text
                  tag={'h1'}
                  className={themeData.classes.productHeadlineClass}
                  field={fields.headline}
                />
              </div>
              <div className="ml-auto w-full max-ml:border-t max-ml:border-t-gray ml:w-[50%]">
                <TabList>
                  <SliderWrapper sliderSettings={sliderSettings}>
                    {props.fields.children.map((tab: HeroProductTabsProps, index: number) => {
                      return (
                        <TabHeading
                          key={index}
                          index={index}
                          onClick={() => {
                            setTabIndex(index);
                            window.location.hash =
                              tab.fields?.contentId?.value !== ''
                                ? tab.fields?.contentId?.value
                                : tab.id;
                          }}
                        >
                          <Text
                            tag={'h3'}
                            className={classNames(
                              themeData.classes.tabs.headlineClass,
                              index === tabIndex ? themeData.classes.tabs.selectedHeadlineClass : ''
                            )}
                            field={tab.fields.title}
                          />
                          {numberOfTabs > 3 &&
                            ((index === numberOfTabs - 1 && tabIndex !== 3) ||
                              (index === 0 && tabIndex !== 0)) && (
                              <div
                                className="absolute top-0 block h-full w-full content-[''] md:hidden"
                                style={{
                                  background:
                                    'linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%)',
                                }}
                              ></div>
                            )}
                        </TabHeading>
                      );
                    })}
                  </SliderWrapper>
                </TabList>
              </div>
            </div>
          </div>
          {props.fields.children.map((tab: HeroProductTabsProps, index: number) => {
            return (
              <TabPanel forceRender={true} key={index}>
                <Placeholder
                  name="components"
                  rendering={tab}
                  render={(tabs) =>
                    tabs.map((tab, index) => (
                      <div key={index} className={classNames('col-span-12')}>
                        {tab}
                      </div>
                    ))
                  }
                  favoriteProducts={props.favoriteProducts}
                />
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<HeroProductTabsProps>(HeroProductTabs);
