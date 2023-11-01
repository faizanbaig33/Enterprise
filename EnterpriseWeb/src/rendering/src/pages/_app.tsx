import type { AppProps } from 'next/app';
// import Script from 'next/script';
import { I18nProvider } from 'next-localization';
import { useState } from 'react';
import { SitecorePageProps } from 'lib/page-props';
import { ThemeContext, ThemeName } from 'lib/context/ThemeContext';
import { SiteConfig } from 'lib/multisite';
import config from 'temp/config';
import 'assets/app.css';
import { ModalIdContextProvider } from 'lib/context/GenericModalIDContext';

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  const sites = JSON.parse(config.sites) as SiteConfig[];
  const currentSite = sites.find(
    (_) => _.name === pageProps.layoutData?.sitecore?.context?.site?.name
  );

  // TODO: Figure out a better default site
  const [site] = useState(currentSite || sites[0]);

  return (
    // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
    // Note Next.js does not (currently) provide anything for translation, only i18n routing.
    // If your app is not multilingual, next-localization and references to it can be removed.

    <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
      <ThemeContext.Provider value={site?.theme as ThemeName}>
        <ModalIdContextProvider>
          {/* <Script
            async
            strategy="afterInteractive"
            type="module"
            src="https://unpkg.com/@google/model-viewer@^2.1.1/dist/model-viewer.min.js"
          /> */}
          <Component {...rest} />
        </ModalIdContextProvider>
      </ThemeContext.Provider>
    </I18nProvider>
  );
}

export default App;
