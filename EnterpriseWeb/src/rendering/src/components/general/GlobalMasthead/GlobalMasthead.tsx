// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import classNames from 'classnames';
import { GlobalMastheadTheme } from './GlobalMasthead.theme';
import { useMemo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ImageWrapper from 'src/helpers/Media/ImageWrapper';
import { FiArrowRight } from 'react-icons/fi';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { useCurrentScreenType } from 'lib/utils/get-screen-type';
import clsx from 'clsx';
import SocialIcons from './SocialIcons';

export type GlobalMastheadProps = Feature.EnterpriseWeb.Components.General.GlobalMasthead;
const GlobalMasthead = (props: GlobalMastheadProps) => {
  const { themeData } = useTheme(GlobalMastheadTheme);
  const { screenType } = useCurrentScreenType();
  const mastheadRef: any = useRef(null);

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
  const [isFixedPosition, setIsFixedPosition] = useState(false);

  useEffect(() => {
    setIsShow(isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsFixedPosition(scrollY >= mastheadRef?.current.offsetTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      data-component="general/globalmasthead"
      className={clsx({
        [`theme-black top-[99px] left-0 right-0 z-[999] col-span-12 flex place-items-center justify-center bg-${backgroundColor}`]:
          true,
        fixed: isFixedPosition,
        static: !isFixedPosition,
      })}
      ref={mastheadRef}
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
            <SocialIcons icons={props.fields.socialIcons} />
            <div className={themeData.classes.anchors}>
              {props.fields.children.map((link: any) => (
                <Link href={link.fields.cta1Link.value.href} key={link.id} passHref>
                  <a>
                    <span className={classNames(themeData.classes.linkTitle, `text-${textColor}`)}>
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
  );
};

export default withDatasourceCheck()<GlobalMastheadProps>(GlobalMasthead);
