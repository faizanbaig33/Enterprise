import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { withDatasourceCheck, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
// Components
//import { AWHeaderTheme } from './AWHeader.theme';
import { LinkWrapper } from 'src/helpers/LinkWrapper';
import ImageWrapper from 'src/helpers/Media/ImageWrapper';
import SingleButton from 'src/helpers/SingleButton/SingleButton';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { RichTextWrapper } from 'src/helpers/RichTextWrapper';
import { getScreenType, ScreenSizeProps } from 'lib/utils/get-screen-type';
import { StandaloneSearchBox } from 'src/helpers/Coveo/StandaloneSearchBox/StandaloneSearchBox';
import { getEnum } from 'lib/utils';
import AWMobileHeader from './AWMobileHeader';

export type AWHeaderProps = Feature.EnterpriseWeb.Components.Navigation.Header.AWHeader;
const AWHeader = (props: AWHeaderProps) => {
  const { fields } = props;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState();
  const [currentMenuTitle, setCurrentMenuTitle] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [currentSubMenu, setCurrentSubMenu] = useState([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const listref = useRef<HTMLUListElement | null>(null);
  const [listWidth, setlistWidth] = useState('');
  const [listOverlayWidth, setlistOverlayWidth] = useState('');
  const [screenType, setScreenType] = useState<ScreenSizeProps>();

  useEffect(() => {
    function handleWindowResize() {
      setScreenType(getScreenType(window.innerWidth));
    }

    window.addEventListener('resize', handleWindowResize);

    // Get screen type on first load
    setScreenType(getScreenType(window.innerWidth));

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    let setWidth = '';
    setlistWidth((listref.current && (listref.current.clientWidth as number)) + 'px');
    if (screenType && screenType.screenType === 'xl') {
      setWidth = '50%';
    } else {
      setWidth = `calc(100% - ${listWidth})`;
    }
    setlistOverlayWidth(setWidth);
  }, [listWidth, screenType]);

  // Sticky Header
  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });
  // handleClickOutside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowModal(false);
        setCurrentMenuTitle('');
        setShowSearchBox(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    function handleClickOutsideSearch(event: any) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setShowModal(false);
        setCurrentMenuTitle('');
        setShowSearchBox(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutsideSearch);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutsideSearch);
    };
  }, [searchWrapperRef]);

  if (!fields) return null;

  const navGroup = fields.children;
  const utilityMenu =
    navGroup.length &&
    navGroup.filter(function (nav: AWHeaderProps) {
      return nav?.fields?.menuTitle && nav?.fields?.menuTitle.value === 'utilityMenu';
    });
  const utilityMenuArray = utilityMenu.length && utilityMenu[0].fields.children;

  const mainMenu =
    navGroup.length &&
    navGroup.filter(function (nav: AWHeaderProps) {
      return nav?.fields?.menuTitle && nav?.fields?.menuTitle.value === 'mainMenu';
    });
  const mainMenuArray = mainMenu.length && mainMenu[0].fields.children;

  const otherMenu =
    navGroup.length &&
    navGroup.filter(function (nav: AWHeaderProps) {
      return (
        nav?.fields?.menuTitle &&
        nav?.fields?.menuTitle.value !== 'utilityMenu' &&
        nav?.fields?.menuTitle.value !== 'mainMenu'
      );
    });
  const otherMenuArray = otherMenu.length && otherMenu[0].fields.children;

  const handleClick = (CurrentSubMenu: AWHeaderProps) => {
    setShowSearchBox(false);
    setIsActive((current) => !current);
    setCurrentSubMenu(CurrentSubMenu);
  };

  const isSticky = () => {
    const utilityNav = document.querySelector('.utility-nav') as HTMLElement;
    const mainNav = document.querySelector('.main-nav') as HTMLElement;
    const scrollTop = window.scrollY;
    if (scrollTop >= 10) {
      utilityNav.classList.add('fixed');
      utilityNav.classList.add('top-0');
      if (!mainNav.classList.contains('static')) {
        mainNav.classList.add('fixed');
      }
      mainNav.classList.add('top-14');
    } else {
      utilityNav.classList.remove('fixed');
      utilityNav.classList.remove('top-0');
      mainNav.classList.remove('fixed');
      mainNav.classList.remove('top-14');
    }
  };

  const handleShowSearchBox = () => {
    if (showModal) {
      setShowSearchBox(true);
    } else {
      setShowSearchBox(!showSearchBox);
    }
    setShowModal(false);
    setIsActive(false);
  };

  const handleMegaMenu = (title: string, childrenNav: AWHeaderProps) => {
    setCurrentMenuTitle(title);
    setShowSearchBox(false);
    setIsActive(false);
    setCurrentMenu(childrenNav);
    setShowModal(true);
  };

  const Modal = ({ currentMenuItems }: AWHeaderProps): JSX.Element => {
    return (
      <>
        {showModal ? (
          <div className="modal-content h-screen bg-white py-xxxs ">
            <div className="mx-auto max-w-[1220px]">
              <div ref={wrapperRef} className="px-l pt-l pb-l">
                {currentMenuItems.map((menu: AWHeaderProps, index: number) => {
                  const showDesktop =
                    getEnum(menu.fields.displayType) &&
                    menu.fields.displayType.fields.Value.value !== 'mobile';
                  return (
                    showDesktop && (
                      <div key={index} className="my-s text-s font-heavy">
                        <>
                          {menu.templateName === 'Separator' ? (
                            <hr className="max-w-[62px] border-t border-gray" />
                          ) : menu.fields?.children.length ? (
                            menu.fields?.navItemStyle.fields.Value.value ===
                            'bold-with-colored-text' ? (
                              <>
                                <RichTextWrapper
                                  field={{ value: menu.fields?.navItemLink.value.text }}
                                  classes="text-s inline-flex"
                                />
                                <SvgIcon icon="chevron-right" className="ml-s" />
                              </>
                            ) : (
                              <>
                                <div
                                  className="inline-flex cursor-pointer flex-row items-center hover:underline"
                                  onClick={() => handleClick(menu.fields?.children)}
                                >
                                  {menu.fields?.navItemImage?.value?.src && (
                                    <ImageWrapper
                                      image={menu.fields?.navItemImage}
                                      additionalDesktopClasses="mr-s h-[52px] w-[52px] mr-xxs"
                                    />
                                  )}
                                  {!menu.fields?.navItemImage?.value?.src &&
                                    getEnum(menu.fields?.navItemIcon) && (
                                      <SvgIcon
                                        icon={getEnum(menu.fields?.navItemIcon)}
                                        className="mr-xxs"
                                      />
                                    )}

                                  <Text
                                    field={{ value: menu.fields?.navItemLink.value.text }}
                                    className={classNames(
                                      'items-center hover:underline',
                                      menu.fields?.navItemStyle.fields.Value.value === 'grey'
                                        ? 'font-medium text-dark-gray '
                                        : 'font-heavy text-black',
                                      isActive
                                        ? 'active-menu flex  hover:underline'
                                        : 'flex  hover:underline'
                                    )}
                                  />
                                  <SvgIcon icon="chevron-right" className="ml-s" />
                                </div>

                                {isActive && <SubMenu />}
                              </>
                            )
                          ) : (
                            menu.fields?.navItemLink &&
                            (menu.fields?.navItemStyle.fields.Value.value ===
                            'bold-with-colored-text' ? (
                              <>
                                <Link href={menu.fields?.navItemLink}>
                                  <a
                                    className={classNames(
                                      ' inline-flex flex-row  hover:underline',
                                      menu.fields?.navItemLink.value.target === '_blank'
                                        ? ' flex-row items-start'
                                        : 'flex-row-reverse items-center'
                                    )}
                                  >
                                    <NavLinkItems
                                      navItem={menu}
                                      additionalDesktopClasses="mr-s h-[52px] w-[52px] mr-xxs"
                                    />
                                    <RichTextWrapper
                                      field={{ value: menu.fields?.navItemLink.value.text }}
                                      classes="text-s"
                                    />
                                    {menu.fields?.navItemLink.value.target === '_blank' && (
                                      <SvgIcon
                                        icon="new-tab-black"
                                        className="ml-xxs inline-flex"
                                      />
                                    )}
                                  </a>
                                </Link>
                              </>
                            ) : (
                              <LinkWrapper
                                field={menu.fields?.navItemLink}
                                className={classNames(
                                  ' inline-flex  hover:underline',
                                  menu.fields?.navItemStyle.fields.Value.value === 'grey'
                                    ? 'font-medium text-dark-gray'
                                    : 'font-heavy text-black',
                                  menu.fields?.navItemLink.value.target === '_blank'
                                    ? ' flex-row items-start'
                                    : 'flex-row-reverse items-center'
                                )}
                              >
                                <NavLinkItems
                                  navItem={menu}
                                  additionalDesktopClasses="mr-s h-[52px] w-[52px] mr-xxs"
                                />
                                {menu.fields?.navItemLink.value.target === '_blank' && (
                                  <SvgIcon icon="new-tab-black" className="ml-xxs inline-flex" />
                                )}
                              </LinkWrapper>
                            ))
                          )}
                        </>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  const SubMenu = (): JSX.Element => {
    return (
      <>
        <div
          className={classNames(
            'absolute inset-x-0 top-0 z-10 h-full w-full bg-white px-l pt-l pb-l opacity-100  transition-all duration-[0.35s] ease-[ease-in-out]',
            isActive ? 'visible translate-x-0' : 'invisible translate-x-full'
          )}
        >
          <div
            className="my-s flex cursor-pointer items-center hover:underline"
            onClick={() => setIsActive((current) => !current)}
          >
            <SvgIcon icon="chevron-left" className="mr-s" /> Back
          </div>
          <>
            {currentSubMenu &&
              currentSubMenu.length &&
              currentSubMenu.map((nav: AWHeaderProps, index: number) => {
                const showDesktop =
                  getEnum(nav.fields.displayType) &&
                  nav.fields.displayType.fields.Value.value !== 'mobile';
                return showDesktop && nav.templateName === 'Separator' ? (
                  <hr className="max-w-[62px] border-t border-gray" key={index} />
                ) : getEnum(nav.fields?.navItemStyle) &&
                  nav.fields?.navItemStyle.fields.Value.value === 'bold-with-colored-text' ? (
                  showDesktop && (
                    <div
                      className={classNames(
                        'inline-flex  hover:underline',
                        nav.fields?.navItemLink.value.target === '_blank'
                          ? ' flex-row items-start'
                          : 'flex-row-reverse items-center'
                      )}
                    >
                      <NavLinkItems
                        navItem={nav}
                        additionalDesktopClasses="mr-s h-[52px] w-[52px] mr-xxs"
                      />
                      <RichTextWrapper
                        field={{ value: nav.fields?.navItemLink.value.text }}
                        classes="text-s"
                        key={index}
                      />
                      {nav.fields?.navItemLink.value.target === '_blank' && (
                        <SvgIcon icon="new-tab-black" className="ml-xxs inline-flex" />
                      )}
                    </div>
                  )
                ) : (
                  nav.fields?.navItemLink &&
                  showDesktop && (
                    <div key={index} className="my-s flex flex-row items-center">
                      <LinkWrapper
                        field={nav.fields?.navItemLink}
                        className={classNames(
                          'flex hover:underline',
                          nav.fields?.navItemStyle.fields.Value.value === 'grey'
                            ? 'font-medium text-dark-gray'
                            : 'font-heavy text-black',
                          nav.fields?.navItemLink.value.target === '_blank'
                            ? ' flex-row items-start'
                            : 'flex-row-reverse items-center'
                        )}
                      >
                        <NavLinkItems
                          navItem={nav}
                          additionalDesktopClasses="mr-s h-[52px] w-[52px] mr-xxs"
                        />
                        {nav.fields?.navItemLink.value.target === '_blank' && (
                          <SvgIcon icon="new-tab-black" className="ml-xxs inline-flex" />
                        )}
                      </LinkWrapper>
                    </div>
                  )
                );
              })}
          </>
        </div>
      </>
    );
  };

  const NavLinkItems = ({ navItem, additionalDesktopClasses }: AWHeaderProps): JSX.Element => {
    return (
      <>
        {navItem.fields?.navItemImage?.value?.src && (
          <ImageWrapper
            image={navItem.fields?.navItemImage}
            additionalDesktopClasses={additionalDesktopClasses}
          />
        )}
        {!navItem.fields?.navItemImage?.value?.src && getEnum(navItem.fields?.navItemIcon) && (
          <SvgIcon icon={getEnum(navItem.fields?.navItemIcon)} className="mr-xxs" />
        )}
      </>
    );
  };
  return (
    <>
      {showSearchBox && (
        <div className="fixed left-0 top-0 z-[20] block h-full w-full bg-black opacity-60"></div>
      )}
      {showModal && <div className="fixed inset-0 z-40 bg-black opacity-40"></div>}
      <div
        data-component="site/awheader"
        className=" relative z-[999] block font-sans max-ml:hidden"
      >
        {/* Utility Nav */}
        <div className="utility-nav h-14 w-full bg-secondary text-white">
          <div className="flex h-14 items-center justify-end max-[1480px]:px-s ml:max-w-screen-xl xl:mx-auto">
            <ul className="z-50 flex items-center">
              {utilityMenuArray.map((menu: AWHeaderProps, index: number) => {
                const showDesktop =
                  getEnum(menu.fields.displayType) &&
                  menu.fields.displayType.fields.Value.value !== 'mobile';
                return menu.templateName === 'Separator' && showDesktop ? (
                  <span key={index}>|</span>
                ) : (
                  showDesktop && (
                    <li key={index} className="px-5 last-of-type:pr-0 hover:underline">
                      {menu.fields.cta1Link &&
                      menu.fields.cta1Link.value.text &&
                      menu.fields.cta1Link.value.href ? (
                        <LinkWrapper
                          className="text-xxs font-heavy capitalize"
                          field={menu.fields?.cta1Link}
                        />
                      ) : (
                        menu.fields?.navItemLink && (
                          <LinkWrapper
                            field={menu.fields?.navItemLink}
                            className={classNames(
                              'flex items-center text-xxs',
                              menu.fields?.navItemLink.value.target === '_blank'
                                ? ' flex-row items-start'
                                : 'flex-row-reverse items-center'
                            )}
                          >
                            {menu.fields?.navItemLink.value.target === '_blank' && (
                              <SvgIcon icon="new-tab" className="ml-xxxs inline-flex" />
                            )}
                            <NavLinkItems
                              navItem={menu}
                              additionalDesktopClasses="max-w-[20px] max-h-[20px] mr-xxs"
                            />
                          </LinkWrapper>
                        )
                      )}
                    </li>
                  )
                );
              })}
            </ul>
            {fields.utilityLogo.value && fields.utilityLogo.value.src && (
              <div className="ml-s min-w-[35px]">
                <Link href={fields.utilityLogoCTA.value.href}>
                  <a>
                    <ImageWrapper
                      image={fields.utilityLogo}
                      additionalDesktopClasses="max-w-[35px]"
                    />
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Main Nav */}
        <nav
          ref={searchWrapperRef}
          className="main-nav mx-auto w-full border-b border-solid border-b-gray bg-white"
        >
          {showModal && (
            <div
              style={{ width: listOverlayWidth }}
              className="min-w-6/12 absolute left-0 top-0 z-[40] h-full bg-black opacity-40 "
            ></div>
          )}
          <div className="main-nav relative z-20 flex w-full items-center justify-center border-t-0 bg-white max-[1480px]:pl-l ml:max-w-screen-xl xl:mx-auto">
            <div className="min-w-[197px]">
              <Link href={fields.logoCTA.value.href}>
                <a>
                  <ImageWrapper
                    image={fields.logo}
                    additionalDesktopClasses="aspect-auto max-w-[197px]"
                    additionalMobileClasses="aspect-auto max-w-[197px]"
                  />
                </a>
              </Link>
            </div>

            {fields.secondaryLogo.value && fields.secondaryLogo.value.src && (
              <div className="ml-s min-w-[197px] max-ml:hidden">
                <Link href={fields.secondaryLogoCTA.value.href}>
                  <a>
                    <ImageWrapper
                      image={fields.secondaryLogo}
                      additionalDesktopClasses="aspect-auto max-w-[197px]"
                      additionalMobileClasses="aspect-auto max-w-[197px]"
                    />
                  </a>
                </Link>
              </div>
            )}
            <div
              className={classNames(
                'mr-[10px] flex w-[86%] items-center justify-end ',
                showModal && 'z-50 bg-white'
              )}
            >
              <ul
                ref={listref}
                className="z-20 flex h-[65px] max-w-[1239px] items-center bg-white pl-[3.5%]"
              >
                {mainMenuArray.map((menu: AWHeaderProps, index: number) => {
                  const showDesktop =
                    getEnum(menu.fields.displayType) &&
                    menu.fields.displayType.fields.Value.value !== 'mobile';
                  return (
                    showDesktop && (
                      <li
                        key={index}
                        className="mx-[15px] my-[10px] flex flex-[1_auto] justify-end self-auto bg-white capitalize"
                      >
                        {menu.fields?.navGroupTitle ? (
                          <Text
                            tag={'span'}
                            field={menu.fields?.navGroupTitle}
                            className={
                              (classNames('cursor-pointer text-xxs font-heavy'),
                              currentMenuTitle === menu.fields?.navGroupTitle.value
                                ? 'cursor-pointer text-xxs font-heavy shadow-[0_3px_0_0_#f26924]'
                                : 'cursor-pointer text-xxs font-heavy')
                            }
                            onClick={() =>
                              handleMegaMenu(
                                menu.fields?.navGroupTitle.value,
                                menu.fields?.children
                              )
                            }
                          />
                        ) : (
                          menu.fields?.cta1Link && (
                            <SingleButton classes={{ wrapper: 'mb-0' }} fields={menu.fields} />
                          )
                        )}
                      </li>
                    )
                  );
                })}
              </ul>
              {otherMenuArray.length > 0 && (
                <ul className={`flex flex-row`}>
                  {otherMenuArray.map((item: AWHeaderProps, index: number) => {
                    const showDesktop =
                      getEnum(item.fields.displayType) &&
                      item.fields.displayType.fields.Value.value !== 'mobile';
                    return (
                      showDesktop &&
                      item.fields?.navItemLink && (
                        <li key={index} className="flex py-xxs pr-xxs">
                          <LinkWrapper
                            field={item.fields?.navItemLink}
                            className={classNames(
                              'flex items-center ',
                              item.fields?.navItemLink.value.target === '_blank'
                                ? ' flex-row items-start'
                                : 'flex-row-reverse items-center'
                            )}
                          >
                            <NavLinkItems
                              navItem={item}
                              additionalDesktopClasses="max-w-[20px] max-h-[20px] mr-xxs"
                            />
                            {item.fields?.navItemLink.value.target === '_blank' && (
                              <SvgIcon icon="new-tab-black" className="ml-xxxs inline-flex" />
                            )}
                          </LinkWrapper>
                        </li>
                      )
                    );
                  })}
                </ul>
              )}

              <div
                className={classNames(
                  'z-[9999] mr-0 flex h-l w-l cursor-pointer items-center justify-center rounded-[50%] bg-light-gray transition-[fill] duration-[0.2s] ease-[cubic-bezier(0,0,0.58,1)]',
                  showSearchBox ? 'bg-primary' : 'bg-light-gray'
                )}
                onClick={() => handleShowSearchBox()}
              >
                <SvgIcon
                  icon="search"
                  className={classNames(showSearchBox ? '[&_path]:fill-white' : '')}
                />
              </div>
            </div>
          </div>
          {/* Search Box     */}
          {showSearchBox && (
            <div className="h-[70px] w-screen">
              <StandaloneSearchBox
                fields={props.fields?.standaloneSearchBox?.fields}
                toggleSearchBoxVisibility={setShowSearchBox}
              />
            </div>
          )}
          <div className="relative mx-auto max-w-full">
            <div
              className={classNames(
                'absolute right-0 h-auto min-w-[50%] bg-white transition-[height] duration-[0.15s] ease-[cubic-bezier(0,0,0.58,1)]'
              )}
              style={{ width: listWidth }}
            >
              <Modal currentMenuItems={currentMenu} />
            </div>
          </div>
        </nav>
      </div>

      <AWMobileHeader fields={fields} />
    </>
  );
};

export default withDatasourceCheck()<AWHeaderProps>(AWHeader);
