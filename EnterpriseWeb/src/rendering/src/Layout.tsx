import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  //VisitorIdentification,
  getPublicUrl,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ThemeName, useTheme } from 'lib/context/ThemeContext';
import MetaData from './helpers/Meta/MetaData';
import { useRecentlyViewed } from './helpers/SaveDocument/useRecentlyViewed';
import { useFavorites } from './helpers/Favorites/useFavorites';

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}

const FontLinks: Record<ThemeName, string> = {
  aw: 'https://use.typekit.net/msc1fop.css',
  rba: 'https://use.typekit.net/shy7gxo.css',
};

const BazaarvoiceScriptUrl =
  'https://apps.bazaarvoice.com/deployments/andersenwindows/main_site/staging/en_US/bv.js';
// Todo: switch between staging and production version depending on environment.

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';

  const { themeName } = useTheme();

  const recentlyViewedLinks = useRecentlyViewed();
  const favoriteProducts = useFavorites();
  //const favoriteProductsCount = favoriteProducts.length;

  return (
    <>
      <Head>
        <title>{route?.fields?.pageTitle?.value || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        <link rel="stylesheet" href={FontLinks[themeName]} />
        <script async src={BazaarvoiceScriptUrl}></script>
      </Head>
      <MetaData />
      {/*
        VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
        If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
        For XM (CMS-only) apps, this should be removed.

        VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
      */}
      {/*<VisitorIdentification />*/}

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={`${mainClassPageEditing} ${themeName}`}>
        <header>
          <div id="header">{route && <Placeholder name="headless-header" rendering={route} />}</div>
        </header>
        <main>
          <div id="hero">{route && <Placeholder name="headless-hero" rendering={route} />}</div>
          <div id="main">
            {route && (
              <Placeholder
                name="headless-main"
                rendering={route}
                recentlyViewedLinks={recentlyViewedLinks}
                favoriteProducts={favoriteProducts}
              />
            )}
          </div>
        </main>
        <div id="pre-footer">
          {route && <Placeholder name="headless-prefooter" rendering={route} />}
        </div>
        <footer>
          <div id="footer">{route && <Placeholder name="headless-footer" rendering={route} />}</div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
