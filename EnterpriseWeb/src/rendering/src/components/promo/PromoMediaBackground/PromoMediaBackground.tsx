// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { useState } from 'react';
import classNames from 'classnames';
// Components
import { PromoMediaBackgroundTheme } from './PromoMediaBackground.theme';
import { Headline } from 'src/helpers/Headline';
import RichTextWrapper from 'src/helpers/RichTextWrapper/RichTextWrapper';
import { ButtonGroup } from 'src/helpers/ButtonGroup';
import { Eyebrow } from 'src/helpers/Eyebrow';
import { MediaPrimary } from 'src/helpers/Media';
import { useCurrentScreenType } from 'lib/utils/get-screen-type';
import { getEnum } from 'lib/utils';
import { SvgIcon } from 'src/helpers/SvgIcon';

export type PromoMediaBackgroundProps =
  Feature.EnterpriseWeb.Components.Promo.PromoMediaBackground.PromoMediaBackground;
const PromoMediaBackground = (props: PromoMediaBackgroundProps) => {
  const { fields } = props;
  const { themeName, themeData } = useTheme(PromoMediaBackgroundTheme);
  const { screenType } = useCurrentScreenType();
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  if (!fields) return null;

  const isDesktop = screenType !== 'sm' ? true : false;
  let hasOverlay = getEnum(fields.overlay) ? true : false;

  const fontColorClass =
    !hasOverlay && getEnum(fields.fontColor)
      ? 'md:text-' + getEnum(fields.fontColor)
      : 'md:text-white';

  if (themeName === 'rba') {
    if (fields.headlineText.value.length > 0 || fields.body.value.length > 0) {
      hasOverlay = true;
    }
  }

  const togglePlayPause = () => {
    const videoId = (
      props.fields?.primaryVideo as Feature.EnterpriseWeb.Elements.Media.YouTubeVideo
    )?.fields.videoId.value;

    const iframeContentWindow = (document.getElementById(videoId) as HTMLIFrameElement)
      ?.contentWindow;

    if (iframeContentWindow) {
      iframeContentWindow.postMessage(
        `{"event":"command", "func":"${isVideoPaused ? 'playVideo' : 'pauseVideo'}", "args":""}`,
        '*'
      );

      setIsVideoPaused(!isVideoPaused);
    }
  };
  return (
    <div data-component="promo/promomediabackground" className="relative">
      <div className={themeData.classes.mediaContainer}>
        <MediaPrimary
          imageLayout="fill"
          ratio="hero"
          additionalDesktopClasses="h-[280px] md:h-[620px]"
          additionalMobileClasses="h-[280px]"
          {...props}
        />
        {fields.primaryVideo && (
          <div
            className={classNames(
              'absolute right-0 bottom-0 z-10 cursor-pointer rounded-full bg-black',
              themeData.classes.iconWrapper
            )}
            onClick={togglePlayPause}
          >
            {isVideoPaused ? <SvgIcon icon="play" size="lg" /> : <SvgIcon icon="pause" size="lg" />}
          </div>
        )}
      </div>
      {hasOverlay && isDesktop && <div className={themeData.classes.overlay}></div>}
      <div className={classNames(themeData.classes.contentWrapper, fontColorClass)}>
        <div className={classNames(themeData.classes.contentContainer, fontColorClass)}>
          <Eyebrow classes={classNames(themeData.classes.eyebrow, fontColorClass)} {...props} />
          <Headline classes={classNames(themeData.classes.headline, fontColorClass)} {...props} />
          <RichTextWrapper
            classes={classNames(themeData.classes.bodyClass, fontColorClass)}
            field={props.fields?.body}
          />
          {fields.cta1Link && fields.cta1Link.value.href && (
            <ButtonGroup classes={themeData.classes.buttonGroupClass} {...props} />
          )}
        </div>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<PromoMediaBackgroundProps>(PromoMediaBackground);
