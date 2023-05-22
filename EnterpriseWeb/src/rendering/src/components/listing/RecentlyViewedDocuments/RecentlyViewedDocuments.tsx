// Global
import { useState } from 'react';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { Component } from 'src/helpers/Component';
import { Headline } from 'src/helpers/Headline';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { LinkWrapper } from 'src/helpers/LinkWrapper';
import { RecentlyViewedDocumentsTheme } from './RecentlyViewedDocuments.theme';
import classNames from 'classnames';

export type RecentlyViewedDocumentsProps =
  Feature.EnterpriseWeb.Components.Listing.RecentlyViewedDocuments.RecentlyViewedDocuments;
const RecentlyViewedDocuments = (props: RecentlyViewedDocumentsProps) => {
  const { themeData, themeName } = useTheme(RecentlyViewedDocumentsTheme);
  const [showAll, setShowAll] = useState(false);
  const recentlyViewedItems = props.recentlyViewedLinks?.recentLinks || [];

  return (
    <Component variant="lg" dataComponent="listing/recentlyvieweddocuments" {...props}>
      {recentlyViewedItems.length > 0 && (
        <>
          <div className={themeData.classes.headlineBorder}>
            <div className="mt-s flex md:mt-xxs">
              {themeName === 'aw' && (
                <div className="m-xxxs mt-[1px] flex">
                  <SvgIcon icon="orange-triangle" />
                </div>
              )}
              <Headline classes={themeData.classes.headlineClass} {...props} />
            </div>
          </div>

          <div className="col-span-12 border-t border-solid border-gray md:col-span-8">
            <ul className={`flex flex-col`}>
              {recentlyViewedItems.length > 0 &&
                recentlyViewedItems.map((item: RecentlyViewedDocumentsProps, index: number) => {
                  return (
                    item && (
                      <li key={index} className={classNames(!showAll && index > 3 && 'hidden')}>
                        <LinkWrapper
                          field={item}
                          className="flex border-b border-solid border-gray py-s text-body text-darkprimary hover:underline"
                          target="_blank"
                        />
                      </li>
                    )
                  );
                })}
            </ul>
            {recentlyViewedItems.length > 4 && (
              <div
                className="mt-s cursor-pointer font-sans text-text-link font-heavy underline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'View Less' : 'View All'}
              </div>
            )}
          </div>
        </>
      )}
    </Component>
  );
};

export default withDatasourceCheck()<RecentlyViewedDocumentsProps>(RecentlyViewedDocuments);
