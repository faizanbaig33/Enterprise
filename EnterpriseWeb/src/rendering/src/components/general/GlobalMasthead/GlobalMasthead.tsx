// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import classNames from 'classnames';
import { Component } from 'src/helpers/Component';
import { GlobalMastheadTheme } from './GlobalMasthead.theme';
import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import ImageWrapper from 'src/helpers/Media/ImageWrapper';
import { FiArrowRight } from 'react-icons/fi';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { useCurrentScreenType } from 'lib/utils/get-screen-type';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { LinkWrapper } from 'src/helpers/LinkWrapper';
import { getEnum, useExperienceEditor } from 'lib/utils';

export type GlobalMastheadProps = Feature.EnterpriseWeb.Components.General.GlobalMasthead;
const GlobalMasthead = (props: GlobalMastheadProps) => {
  const { themeData } = useTheme(GlobalMastheadTheme);
  const { screenType } = useCurrentScreenType();
  const isEE = useExperienceEditor();

  const isDesktop = screenType !== 'sm' ? true : false;

  const LogoImage = isDesktop ? props.fields.desktopLogo : props.fields.mobileLogo;
  const backgroundColor = useMemo(
    () => props.fields.backgroundColor.fields.Value.value,
    [props.fields.backgroundColor]
  );
  const textColor = useMemo(() => {
    if (backgroundColor.toLowerCase() === 'orange') return 'white';
    else if (backgroundColor.toLowerCase() === 'white') return 'black';
    else if (backgroundColor.toLowerCase() === 'gray') return 'white';
    else return 'white';
  }, [backgroundColor]);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setIsShow(isDesktop);
  }, [isDesktop]);

  return (
    <Component variant="full" dataComponent="general/globalmasthead" {...props}>
      <div
        className={classNames(
          'theme-black sticky top-0 left-0 right-0 col-span-12 flex place-items-center justify-center',
          `bg-${backgroundColor}`
        )}
      >
        <div className={themeData.classes.headWrapper}>
          <div className={classNames(themeData.classes.headLogoWrapper, `text-${textColor}`)}>
            <div onClick={() => setIsShow(!isShow)} className={themeData.classes.menuIcon}>
              {!isShow ? <IoIosArrowDropdown size={36} /> : <IoIosArrowDropup size={36} />}
            </div>
            <div className={themeData.classes.headLogo}>
              <Link href={props.fields.linkLogo.value.href} passHref>
                <a>
                  {LogoImage ? (
                    <div className={`h-[50px] w-[300px] object-cover`}>
                      <ImageWrapper
                        image={props.fields.desktopLogo}
                        mobileImage={props.fields.mobileLogo}
                        additionalDesktopClasses="h-full w-full cursor-pointer"
                      />
                    </div>
                  ) : (
                    <span className={themeData.classes.headline}>
                      {props.fields.headlineText.value}
                    </span>
                  )}
                </a>
              </Link>
            </div>
          </div>
          {isShow && (
            <div className={themeData.classes.anchorWrapper}>
              <div className={themeData.classes.socialIconsWrapper}>
                <div className={themeData.classes.iconWrapper}>
                  {props.fields.socialIcons.map((menu: any, index: number) => {
                    return (
                      menu.fields?.navItemLink.value &&
                      getEnum(menu.fields?.navItemIcon) && (
                        <div key={index} className="mr-xxs mt-xxxs">
                          {isEE ? (
                            <SvgIcon icon={getEnum(menu.fields?.navItemIcon)} />
                          ) : (
                            <LinkWrapper field={menu.fields?.navItemLink}>
                              <SvgIcon icon={getEnum(menu.fields?.navItemIcon)} />
                            </LinkWrapper>
                          )}
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
              <div className={themeData.classes.anchors}>
                {props.fields.children.map((link: any) => (
                  <Link href={link.fields.cta1Link.value.href} key={link.id} passHref>
                    <a>
                      <span
                        className={classNames(themeData.classes.linkTitle, `text-${textColor}`)}
                      >
                        {link.fields.cta1Link.value.text}
                      </span>
                    </a>
                  </Link>
                ))}
              </div>
              <div className="hidden md:block">
                <Link href={props.fields.rightSideLink.value.href} passHref>
                  <a className={`flex items-center text-${textColor}`}>
                    <span className="text-bold mr-1 text-sm">As seen in</span>
                    <FiArrowRight size={16} />
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<GlobalMastheadProps>(GlobalMasthead);
