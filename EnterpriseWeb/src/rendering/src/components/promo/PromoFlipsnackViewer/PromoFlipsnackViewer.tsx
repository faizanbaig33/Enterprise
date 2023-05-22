// Global
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { useTheme } from 'lib/context/ThemeContext';
import { getEnum, useExperienceEditor } from 'lib/utils';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

// Components
import { BodyCopy } from 'src/helpers/BodyCopy';
import { ButtonGroup } from 'src/helpers/ButtonGroup';
import { Component } from 'src/helpers/Component';
import { Headline } from 'src/helpers/Headline';
import { PromoFlipsnackViewerTheme } from './PromoFlipsnackViewer.theme';

export type ImagePosition = 'right' | 'left';

export type PromoFlipsnackViewerProps =
  Feature.EnterpriseWeb.Components.Promo.PromoFlipsnackViewer.PromoFlipsnackViewer;
const PromoFlipsnackViewer = (props: PromoFlipsnackViewerProps) => {
  const flipsnackLeftAlign =
    (getEnum<ImagePosition>(props?.fields?.flipsnackPlacement) ?? 'right') == 'left';
  const { themeData } = useTheme(PromoFlipsnackViewerTheme(flipsnackLeftAlign));

  const baseUrl =
    props?.fields?.flipsnackBaseSrc?.value?.length > 0
      ? props?.fields?.flipsnackBaseSrc?.value
      : `https://cdn.flipsnack.com/widget/v2/widget.html`;
  const srcUrl =
    baseUrl +
    (baseUrl.indexOf('?') >= 0 ? '&' : '?') +
    `hash=${props?.fields?.flipsnackId?.value}&t=${props?.fields?.flipsnackVersion?.value}`;
  const isEE = useExperienceEditor();

  return (
    <Component variant="lg" dataComponent="promo/promoflipsnackviewer" {...props}>
      <div className={themeData.classes.iframeContainer}>
        <iframe
          className={themeData.classes.iframe}
          src={srcUrl}
          seamless={true}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div>
      <div className={themeData.classes.copyContainer}>
        <Headline classes={themeData.classes.headline} {...props} />
        {(isEE || props.fields?.body) && <BodyCopy classes={themeData.classes?.body} {...props} />}
        {(isEE || props.fields?.cta1Link?.value?.href) && (
          <ButtonGroup classes={themeData.classes.buttonGroupClasses} {...props} />
        )}
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<PromoFlipsnackViewerProps>(PromoFlipsnackViewer);
