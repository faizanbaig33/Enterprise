import { useState, useEffect } from 'react';
import { useSitecoreContext, getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';
import { useTheme } from 'lib/context/ThemeContext';
import { useCurrentScreenType } from 'lib/utils/get-screen-type';
import { BreadcrumbTheme } from './Breadcrumb.theme';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { LinkWrapper } from 'src/helpers/LinkWrapper';

import Head from 'next/head';

type BreadcrumbItem = {
  name: string;
  href: string;
};
const publicUrl = getPublicUrl();

const Breadcrumb = () => {
  const { themeData } = useTheme(BreadcrumbTheme);
  const context = useSitecoreContext();
  const pageTitle = context && (context.sitecoreContext?.route?.fields?.pageTitle.value as string);
  const breadcrumb = (context && (context.sitecoreContext?.breadcrumb as BreadcrumbItem[])) || [];
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (breadcrumb?.length > 0 && breadcrumb?.length > 5) {
      // If the breadcrumb has more than 5 items, collapse the breadcrumb
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, []);

  const handleClick = () => {
    setIsCollapsed(false);
  };

  const breadcrumData = breadcrumb?.length > 0 && (breadcrumb.slice(1) as BreadcrumbItem[]);
  const currentItem = breadcrumData && breadcrumData.length > 0 && breadcrumData.pop();
  const previousItem = breadcrumData && breadcrumData.length > 0 && breadcrumData.pop();

  const { screenType } = useCurrentScreenType();
  const isDesktop = screenType !== 'sm' && screenType !== 'md' ? true : false;

  const firstItem = breadcrumb?.[0].name && (
    <li key="home">
      <LinkWrapper
        field={{ href: breadcrumb[0].href, text: breadcrumb[0].name }}
        className="flex items-center"
      >
        {currentItem && <SvgIcon icon="caret-right" className="pl-xxxs" />}
      </LinkWrapper>
    </li>
  );

  const collapsedItems = (
    <>
      {firstItem}
      <li className="pl-xxxs">
        <span className="flex cursor-pointer items-center">
          ...
          <SvgIcon icon="caret-right" className="pl-xxxs" />
        </span>
      </li>
      {previousItem && previousItem.name && (
        <li className="px-xxxs">
          <LinkWrapper
            field={{
              href: previousItem.href,
              text: previousItem.name.slice(0, 15) + (previousItem.name.length > 15 ? '...' : ''),
            }}
            className="flex items-center"
          >
            <SvgIcon icon="caret-right" className="pl-xxxs" />
          </LinkWrapper>
        </li>
      )}

      {currentItem && (
        <li className="px-xxxs text-black">{currentItem.name ? currentItem.name : pageTitle}</li>
      )}
    </>
  );

  const listItems =
    breadcrumData &&
    breadcrumData.length > 0 &&
    breadcrumData.map(
      (item, index) =>
        item.name && (
          <li key={index} className="px-xxxs">
            <LinkWrapper
              field={{
                href: item.href,
                text: item.name.slice(0, 15) + (item.name.length > 15 ? '...' : ''),
              }}
              className="flex items-center"
            >
              <SvgIcon icon="caret-right" className="pl-xxxs" />
            </LinkWrapper>
          </li>
        )
    );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb?.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${publicUrl}${item.href === '/' ? '' : item.href}`,
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="my-8 md:max-w-screen-lg lg:mx-auto">
        <div className="section-grid grid grid-cols-2 gap-s px-m md:grid-cols-12 md:gap-s">
          <div className="col-span-12">
            <div className={themeData.classes.breadcrumbContainer}>
              <nav className="" aria-label="breadcrumb">
                {isDesktop ? (
                  <>
                    {isCollapsed ? (
                      <ol className="flex max-ml:hidden" onClick={handleClick}>
                        {collapsedItems}
                      </ol>
                    ) : (
                      <ol className="flex max-ml:hidden">
                        {currentItem && firstItem}
                        {listItems}
                        {previousItem && previousItem.name && (
                          <li className="px-xxxs">
                            <LinkWrapper
                              field={{
                                href: previousItem.href,
                                text:
                                  previousItem.name.slice(0, 15) +
                                  (previousItem.name.length > 15 ? '...' : ''),
                              }}
                              className="flex items-center"
                            >
                              <SvgIcon icon="caret-right" className="pl-xxxs" />
                            </LinkWrapper>
                          </li>
                        )}

                        {currentItem && (
                          <li className="px-xxxs text-black">
                            {currentItem.name ? currentItem.name : pageTitle}
                          </li>
                        )}
                      </ol>
                    )}
                  </>
                ) : (
                  <>
                    {previousItem && previousItem.name ? (
                      <div className="px-xxxs ml:hidden">
                        <LinkWrapper
                          field={{
                            href: previousItem.href,
                            text:
                              previousItem.name.slice(0, 15) +
                              (previousItem.name.length > 15 ? '...' : ''),
                          }}
                          className="flex flex-row-reverse items-center justify-end"
                        >
                          <SvgIcon icon="caret-right" className="rotate-180 pl-xxs" />
                        </LinkWrapper>
                      </div>
                    ) : (
                      currentItem &&
                      breadcrumb?.[0].name && (
                        <LinkWrapper
                          field={{ href: breadcrumb[0].href, text: breadcrumb[0].name }}
                          className="flex flex-row-reverse items-center justify-end ml:hidden"
                        >
                          <SvgIcon icon="caret-right" className="rotate-180 pl-xxs" />
                        </LinkWrapper>
                      )
                    )}
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
