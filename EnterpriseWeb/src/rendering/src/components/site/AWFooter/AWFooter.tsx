// Global
import { useState } from 'react';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { withDatasourceCheck, Text } from '@sitecore-jss/sitecore-jss-nextjs';
// Components

//import { AWFooterTheme } from './AWFooter.theme';
import { LinkWrapper } from 'src/helpers/LinkWrapper';
import { SvgIcon } from 'src/helpers/SvgIcon';
import ImageWrapper from 'src/helpers/Media/ImageWrapper';
import { useCurrentScreenType } from 'lib/utils/get-screen-type';
import { getEnum } from 'lib/utils';
import { useExperienceEditor } from 'lib/utils';

export type AWFooterProps = Feature.EnterpriseWeb.Components.Navigation.Footer.AWFooter;
const AWFooter = (props: AWFooterProps) => {
  const { fields } = props;
  const isEE = useExperienceEditor();
  const { screenType } = useCurrentScreenType();
  const isDesktop = screenType !== 'sm' && screenType !== 'md' ? true : false;

  const currentYear = new Date().getFullYear().toString();
  const copyrightText = fields?.copyright.value;
  let textWithReplacedYear = copyrightText;
  if (copyrightText?.includes('{currentYear}')) {
    textWithReplacedYear = copyrightText.replace('{currentYear}', currentYear);
  }

  const navGroup = fields?.children;
  const socialMenu =
    navGroup?.length &&
    navGroup.filter(function (nav: AWFooterProps) {
      return nav?.fields?.menuTitle.value === 'socialMenu';
    });
  const footerMenu =
    navGroup?.length &&
    navGroup.filter(function (nav: AWFooterProps) {
      return nav.fields.menuTitle.value === 'footerMenu';
    });
  const privacyMenu =
    navGroup?.length &&
    navGroup.filter(function (nav: AWFooterProps) {
      return nav.fields.menuTitle.value === 'privacyMenu';
    });
  const privacyMenuArray = privacyMenu?.length && privacyMenu[0].fields.children;
  const socialMenuArray = socialMenu?.length && socialMenu[0].fields.children;
  const footerMenuArray = footerMenu?.length && footerMenu[0].fields.children;

  const Accordion = ({ title, children }: AWFooterProps) => {
    const [isOpen, setOpen] = useState(false);
    return (
      <div>
        <div
          className={`border-t border-solid border-t-white py-xs ${
            isOpen
              ? 'open [&_span]:after:-rotate-90 [&_span]:after:transition-all [&_span]:after:duration-[0.1s]'
              : '[&_span]:after:rotate-90 [&_span]:after:transition-all [&_span]:after:duration-[0.1s]'
          }`}
          onClick={() => setOpen(!isOpen)}
        >
          <span className="flex items-center justify-between text-small font-heavy uppercase leading-[14px] after:text-base after:content-['\276F'] ml:text-xxs ">
            {title}
          </span>
        </div>
        <div
          className={`accordion-item ${
            !isOpen
              ? 'collapsed max-h-0 transition-[max-height] duration-[0.35s] ease-[cubic-bezier(0,1,0,1)]'
              : 'h-auto max-h-[9999px] overflow-hidden transition-[max-height] duration-[0.3s] ease-[cubic-bezier(1,0,1,0)]'
          }`}
        >
          <div>{children}</div>
        </div>
      </div>
    );
  };

  if (!fields) return null;

  return (
    <div
      data-component="site/awfooter"
      className="awfooter bg-black py-m text-base text-white ml:py-l"
    >
      <div className="max-lg:px-m ml:max-w-screen-lg lg:mx-auto">
        <div className="flex flex-col flex-wrap ml:flex-row">
          <div className="flex flex-col max-ml:order-4 max-ml:mt-l ml:w-[16.6%] ml:basis-[16.6%] ml:pr-xxs">
            <div className="mb-s font-sans text-xs font-heavy uppercase max-ml:hidden ">
              <Text tag={'h3'} field={fields.tagLine} />
            </div>
            <div className="mb-s text-body max-ml:order-2">
              <Text field={{ value: textWithReplacedYear }} />
            </div>
            <div className="flex flex-wrap max-ml:order-1 max-ml:mb-s">
              {socialMenuArray.map((menu: AWFooterProps, index: number) => {
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
          <div className="flex flex-col max-ml:order-1 ml:w-[83.4%] ml:basis-[83.4%] ml:pl-xxs">
            <div className="mb-l font-sans text-sm-s font-heavy uppercase ml:hidden">
              <Text tag={'h3'} field={fields.tagLine} />
            </div>
            <div className="flex w-full max-ml:flex-col max-ml:border-b max-ml:border-solid max-ml:border-b-white ml:shrink ml:grow ml:basis-0 ml:justify-between">
              {footerMenuArray.map((menu: AWFooterProps, index: number) => {
                return (
                  <div key={index} className="flex flex-col ml:w-[20%] ml:pr-xxs">
                    {isDesktop ? (
                      <>
                        <div className="mb-xxxs font-sans text-xxs font-heavy uppercase leading-none">
                          <Text tag={'span'} field={menu.fields?.navGroupTitle} />
                        </div>
                        <ul className={`flex flex-col`}>
                          {menu.fields?.children.map((nav: AWFooterProps, index: number) => {
                            return (
                              nav.fields?.navItemLink && (
                                <li key={index} className="py-xxxs">
                                  <LinkWrapper
                                    field={nav.fields?.navItemLink}
                                    className="text-body hover:underline"
                                  >
                                    {nav.fields?.navItemLink.value.target === '_blank' && (
                                      <SvgIcon icon="new-tab" className="ml-xxxs inline-flex" />
                                    )}
                                  </LinkWrapper>
                                </li>
                              )
                            );
                          })}
                        </ul>
                      </>
                    ) : (
                      <Accordion title={menu.fields?.navGroupTitle.value as string}>
                        {menu.fields && menu.fields.children.length && (
                          <ul className={`ease flex flex-col  transition-all duration-1000`}>
                            {menu.fields?.children.map((nav: AWFooterProps, index: number) => {
                              return (
                                nav.fields?.navItemLink && (
                                  <li key={index} className="py-xxxs ">
                                    <LinkWrapper
                                      field={nav.fields?.navItemLink}
                                      className="text-small hover:underline"
                                    >
                                      {nav.fields?.navItemLink.value.target === '_blank' && (
                                        <SvgIcon icon="new-tab" className="ml-xxxs inline-flex" />
                                      )}
                                    </LinkWrapper>
                                  </li>
                                )
                              );
                            })}
                          </ul>
                        )}
                      </Accordion>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-l flex flex-col max-ml:order-3 max-ml:mb-l ml:w-[16.6%] ml:basis-[16.6%] ml:pr-xxs">
            <ImageWrapper
              image={fields.logo}
              additionalMobileClasses="max-w-[120px]"
              additionalDesktopClasses="max-w-[120px]"
            />
          </div>
          <div className="mt-l flex flex-col max-ml:order-3 ml:w-[83.4%] ml:basis-[83.4%] ml:pl-xxs">
            <div className="mb-s flex w-full text-body ml:mb-xxs">
              <Text tag={'h3'} field={fields.privacyCaption} />
            </div>
            <div className="w-full flex-wrap max-ml:text-body md:flex">
              {privacyMenuArray.map((menu: AWFooterProps, index: number) => {
                return (
                  menu.fields?.navItemLink && (
                    <span key={index}>
                      <LinkWrapper className="text-body underline" field={menu.fields?.navItemLink}>
                        {menu.fields?.navItemLink.value.target === '_blank' && (
                          <SvgIcon icon="new-tab" className="ml-xxxs inline-flex" />
                        )}
                      </LinkWrapper>
                      {index < privacyMenuArray.length - 1 && (
                        <span className="inline-flex md:px-xxxs"> | </span>
                      )}
                    </span>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<AWFooterProps>(AWFooter);
