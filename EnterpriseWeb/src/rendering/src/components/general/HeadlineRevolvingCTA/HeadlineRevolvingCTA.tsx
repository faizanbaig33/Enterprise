import { useEffect, useState } from 'react';
// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import Slider from 'react-slick';

// Components
import { Component } from 'src/helpers/Component';
import { Headline } from 'src/helpers/Headline';
import { LinkWrapper } from 'src/helpers/LinkWrapper';
import { SvgIcon } from 'src/helpers/SvgIcon';
//import { HeadlineRevolvingCTATheme } from './HeadlineRevolvingCTA.theme';
import { useCurrentScreenType } from 'lib/utils/get-screen-type';

export type HeadlineRevolvingCTAProps =
  Feature.EnterpriseWeb.Components.General.HeadlineRevolvingCta.HeadlineRevolvingCta;
const HeadlineRevolvingCTA = (props: HeadlineRevolvingCTAProps) => {
  const { fields } = props;
  const { screenType } = useCurrentScreenType();
  const [slideMaxWidth, setSlideMaxWidth] = useState('');
  const isDesktop = screenType !== 'sm' ? true : false;
  const hasLink2 = fields?.link2?.value.text ? true : false;
  const hasLink3 = fields?.link3?.value.text ? true : false;

  useEffect(() => {
    const links = document.querySelectorAll('.headlinerevolvingcta .title');
    let maxWidth = 200;
    links.forEach((link: Element) => {
      const width = link.getBoundingClientRect().width;
      if (width > maxWidth) {
        maxWidth = width;
      }
    });
    maxWidth = maxWidth + 46;
    if (isDesktop && maxWidth > 600) {
      maxWidth = 600;
    }

    if (isDesktop) {
      setSlideMaxWidth(Math.round(maxWidth) + 'px');
    } else {
      setSlideMaxWidth('100%');
    }

    if (hasLink2 || hasLink3) {
      const slickListDiv = document.querySelector(
        '.headlinerevolvingcta .slick-list'
      ) as HTMLElement;

      slickListDiv.classList.add('setgap');
    }
  }, [hasLink2, hasLink3, isDesktop, screenType, slideMaxWidth]);

  if (!fields) return null;

  const NumOfLinks =
    hasLink2 && hasLink3 ? 3 : (hasLink2 && !hasLink3) || (!hasLink2 && hasLink3) ? 2 : 1;

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    slidesToShow: isDesktop ? 1 : NumOfLinks,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    autoplay: true,
    adaptiveHeight: false,
    autoplaySpeed: fields.autoScrollTiming.value ? fields.autoScrollTiming.value * 1000 : 2000,
    initialSlide: isDesktop && NumOfLinks ? NumOfLinks : 1,
  };

  return (
    <Component variant="lg" dataComponent="general/headlinerevolvingcta" {...props}>
      <div className="headlinerevolvingcta col-span-12">
        <div className=" mx-auto flex flex-col md:flex-row md:items-center  md:justify-center">
          <div className="fadeInUp  ">
            <Headline classes="font-heavy text-m ml:text-xl" {...props} />
          </div>
          <div className="slider-wrapper fadeInUp  md:pl-s" style={{ maxWidth: slideMaxWidth }}>
            <div className="block">
              <Slider
                {...settings}
                className={`${NumOfLinks === 1 ? 'slick-active slick-current' : ''}`}
              >
                <div className="flex cursor-pointer items-center">
                  <LinkWrapper
                    field={
                      !isDesktop
                        ? fields?.link1
                        : isDesktop && hasLink2
                        ? fields?.link2
                        : isDesktop && hasLink3
                        ? fields?.link3
                        : fields?.link1
                    }
                    className="title inline-flex items-center font-sans text-m font-heavy ml:text-xl"
                  >
                    <SvgIcon icon="arrow" className="icon flex items-center justify-center" />
                  </LinkWrapper>
                </div>
                {hasLink2 && (
                  <div className="flex cursor-pointer items-center">
                    <LinkWrapper
                      field={
                        !isDesktop
                          ? fields?.link2
                          : isDesktop && hasLink2
                          ? fields?.link1
                          : fields?.link2
                      }
                      className="title inline-flex items-center font-sans text-m font-heavy ml:text-xl "
                    >
                      <SvgIcon icon="arrow" className="icon flex items-center justify-center" />
                    </LinkWrapper>
                  </div>
                )}
                {hasLink3 && (
                  <div className="flex cursor-pointer items-center">
                    <LinkWrapper
                      field={
                        !isDesktop
                          ? fields?.link3
                          : isDesktop && hasLink2
                          ? fields?.link3
                          : fields?.link1
                      }
                      className="title inline-flex items-center font-sans text-m font-heavy ml:text-xl  "
                    >
                      <SvgIcon icon="arrow" className="icon flex items-center justify-center" />
                    </LinkWrapper>
                  </div>
                )}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<HeadlineRevolvingCTAProps>(HeadlineRevolvingCTA);
