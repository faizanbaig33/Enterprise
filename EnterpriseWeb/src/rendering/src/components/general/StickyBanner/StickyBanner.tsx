// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import classNames from 'classnames';
import { Component } from 'src/helpers/Component';
import { Headline } from 'src/helpers/Headline';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { ButtonGroup } from 'src/helpers/ButtonGroup';
import { StickyBannerTheme } from './StickyBanner.theme';
import { useState } from 'react';
import { SvgIcon } from 'src/helpers/SvgIcon';

export type StickyBannerProps = Feature.EnterpriseWeb.Components.General.StickyBanner.StickyBanner;
const StickyBanner = (props: StickyBannerProps) => {
  const { themeData } = useTheme(StickyBannerTheme);

  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return <></>;
  }

  return (
    <Component variant="full" dataComponent="general/stickybanner" {...props}>
      <div
        className={classNames(
          'theme-black fixed bottom-0 left-0 right-0 col-span-12 place-items-center bg-theme-bg'
        )}
      >
        <div className={classNames(themeData.classes.bannerWrapper)}>
          <div className={themeData.classes.textWrapper}>
            <Headline classes={themeData.classes.headline} {...props} />
            <BodyCopy classes={themeData.classes.bodyClass} {...props} />
          </div>
          <div className="col-span-2 place-content-center ml:col-span-5 ml:place-self-end ml:self-center">
            <ButtonGroup classes={themeData.classes.buttonGroupClass} {...props} />
          </div>
          <button
            className={classNames(themeData.classes.iconWrapper)}
            onClick={() => setIsDismissed(true)}
          >
            <SvgIcon icon="close" size="md" />
          </button>
        </div>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<StickyBannerProps>(StickyBanner);
