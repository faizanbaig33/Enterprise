// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { CardImageAndProductDetailsTheme } from './CardImageAndProductDetails.theme';
import { Component } from 'src/helpers/Component';
import { ImagePrimary } from 'src/helpers/Media';
import { Headline } from 'src/helpers/Headline';
import { useState } from 'react';
import { IconTypes, SvgIcon } from 'src/helpers/SvgIcon';
import { LinkWrapper } from 'src/helpers/LinkWrapper';
import { getEnum } from 'lib/utils';

export type ProductLinkProps = Feature.EnterpriseWeb.Cards.ProductDetailLink;

export type CardImageAndProductDetailsProps =
  Feature.EnterpriseWeb.Cards.CardImageAndProductDetails & {
    fields: {
      children: [ProductLinkProps];
    };
  };

const CardImageAndProductDetails = (props: CardImageAndProductDetailsProps) => {
  const { themeData } = useTheme(CardImageAndProductDetailsTheme);
  const [details, setDetails] = useState(false);

  const linkWrapperClasses =
    'mb:leading-[22px] flex w-fit items-center whitespace-nowrap p-2 text-text-link font-normal leading-[10px] text-theme-text hover:underline hover:decoration-primary hover:underline-offset-8 disabled:border-gray disabled:text-gray';
  const svgIconClasses =
    'ml-[10px] text-theme-btn-bg-hover hover:underline hover:decoration-primary hover:underline-offset-8';

  return (
    <Component
      padding="px-0"
      variant="lg"
      dataComponent="card/cardimageandproductdetails"
      {...props}
    >
      <div className={themeData.classes.parentDiv}>
        <ImagePrimary {...props} ratio={'square'} />
        <div className={details ? themeData.classes.darkImageOverlay : 'collapse absolute'}>
          <div className={themeData.classes.groupDiv}>
            <Headline classes={themeData.classes.headline} {...props} />
            <div className="product-links">
              {props.fields?.children?.map((_item: ProductLinkProps, i: number) => {
                const _icon = getEnum<IconTypes>(_item.fields?.productIcon);
                return (
                  <div key={i}>
                    {_item.fields?.productLink && (
                      <LinkWrapper field={_item.fields?.productLink} className={linkWrapperClasses}>
                        {_item.fields?.productIcon && (
                          <SvgIcon icon={_icon} className={svgIconClasses} />
                        )}
                      </LinkWrapper>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* when button is clicked, change styling on image */}
      <div className="col-span-12">
        <button
          className={themeData.classes.detailsButton}
          type="button"
          onClick={() => {
            setDetails(!details);
          }}
        >
          {!details ? 'View Details' : 'Hide Details'}
          <SvgIcon
            icon={!details ? 'smallplus' : 'smallclose'}
            className={themeData.classes.iconClass}
          />
        </button>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<CardImageAndProductDetailsProps>(CardImageAndProductDetails);
