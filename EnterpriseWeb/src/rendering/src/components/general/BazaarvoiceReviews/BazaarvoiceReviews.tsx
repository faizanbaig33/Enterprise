// Global
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { useTheme } from 'lib/context/ThemeContext';
import { useBVScript } from 'lib/utils/use-bv-script';
import { useEffect, useState } from 'react';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

// Components
import { Component } from 'src/helpers/Component';
import { Headline } from 'src/helpers/Headline';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { BazaarvoiceReviewsTheme } from './BazaarvoiceReviews.theme';

export type BazaarvoiceReviewsProps =
  Feature.EnterpriseWeb.Components.General.BazaarvoiceReviews.BazaarvoiceReviews;
const BazaarvoiceReviews = (props: BazaarvoiceReviewsProps) => {
  const { themeData } = useTheme(BazaarvoiceReviewsTheme);
  const productItem = props?.fields?.productItem;
  const bazaarvoiceProductId = productItem?.fields?.bazaarvoiceProductId?.value;
  const componentId = 'bazaarvoiceReview-' + bazaarvoiceProductId;
  const [isOpen, setOpen] = useState(false);

  // Add the bazaarvoice script
  useBVScript();

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <Component variant="lg" dataComponent="general/bazaarvoicereviews" {...props}>
      <Headline classes={themeData.classes.headline} {...props} />
      <div className={themeData.classes.wrapperClass}>
        <a
          className={themeData.classes.accordionToggleContainer}
          data-anchor-name={'#' + componentId}
        >
          <h3 className={themeData.classes.accordionHeadline} onClick={() => setOpen(!isOpen)}>
            <div
              className={themeData.classes.readMore}
              data-no-reviews-text="@noReviewsText"
              data-read-reviews-text="@readReviewsText"
            >
              Read More
            </div>
            <div
              className={themeData.classes.accordionRatingContainer}
              data-bv-show="rating_summary"
              data-bv-product-id={bazaarvoiceProductId}
            ></div>
            <div className={themeData.classes.accordionToggleIndicator}>
              <SvgIcon icon={isOpen ? 'minus' : 'plus'} className={themeData.classes.iconClass} />
            </div>
          </h3>
        </a>
        <div
          className={`content-container ${
            isOpen ? themeData.classes.contentOpen : themeData.classes.contentClosed
          }`}
          id={componentId}
        >
          <div className="content">
            <div data-bv-show="reviews" data-bv-product-id={bazaarvoiceProductId}></div>
          </div>
        </div>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<BazaarvoiceReviewsProps>(BazaarvoiceReviews);
