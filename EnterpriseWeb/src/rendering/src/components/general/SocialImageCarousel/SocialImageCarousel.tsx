// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { Component } from 'src/helpers/Component';
import { SocialImageCarouselTheme } from './SocialImageCarousel.theme';
import Script from 'next/script';
import { Headline } from 'src/helpers/Headline';
import { BodyCopy } from 'src/helpers/BodyCopy';

export type SocialImageCarouselProps = Feature.EnterpriseWeb.Components.Social.SocialImageCarousel;
const SocialImageCarousel = (props: SocialImageCarouselProps) => {
  const { themeData } = useTheme(SocialImageCarouselTheme);

  const siteName = props.fields.siteName.value;
  const productId = props.fields.productFilter.value;
  const slideFormat = props.fields.slideFormat?.fields?.Value?.value ?? 'inline';

  return (
    <Component variant="lg" dataComponent="general/socialimagecarousel" {...props}>
      <div
        className={
          slideFormat === 'inline' ? themeData.classes.wrapper : themeData.classes.wrapper2
        }
      >
        {slideFormat === 'inline' ? (
          <div className={themeData.classes.headlineClass}>
            <Headline {...props} />
            <BodyCopy classes={themeData.classes.bodyCopyClass} {...props} />
          </div>
        ) : (
          <div>
            <Headline classes={themeData.classes.headlineText2} {...props} />
          </div>
        )}
        <div>
          <Script
            onLoad={() => {
              console.log('script loaded');
            }}
            src={`https://edge.curalate.com/sites/${siteName}/site/latest/site.min.js`}
          ></Script>
          <div
            className={
              slideFormat === 'inline'
                ? themeData.classes.carouselInline
                : themeData.classes.carouselStack
            }
            data-crl8-container-id="product"
            data-crl8-filter={`productId:${productId}`}
          ></div>
        </div>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<SocialImageCarouselProps>(SocialImageCarousel);
