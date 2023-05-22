// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import classNames from 'classnames';

// Components
import { ProductPreviewCardTheme } from './ProductPreviewCard.theme';
import { Headline } from 'src/helpers/Headline';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { Eyebrow } from 'src/helpers/Eyebrow';
import { ButtonGroup } from 'src/helpers/ButtonGroup';
import { ImagePrimary, Image } from 'src/helpers/Media';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { EnumField } from 'lib/utils/get-enum';

type priceLevel = 1 | 2 | 3 | 4 | 5;

type ProductItem = Feature.EnterpriseWeb.Data.Products.Product & {
  fields?: {
    exteriorSwatchCollection?: Feature.EnterpriseWeb.Elements.Swatches.SwatchCollection & {
      fields?: {
        swatches: Feature.EnterpriseWeb.Elements.Swatches.Swatch[];
      };
    };
    priceLevel: EnumField<priceLevel>;
    featuredExteriorColors: Feature.EnterpriseWeb.Elements.Swatches.Swatch[];
  };
};

export type ProductPreviewCardProps = Feature.EnterpriseWeb.Cards.ProductPreviewCard & {
  fields?: {
    productItem: ProductItem;
  };
};

const ProductPreviewCard = (props: ProductPreviewCardProps) => {
  const { fields } = props;
  const { themeName, themeData } = useTheme(ProductPreviewCardTheme);
  const favoriteProductsArr = props.favoriteProducts || [];

  if (!fields) return null;

  const productID = fields.productItem.fields.productId?.value;
  //Check if the current product is favorited
  const isFavorited = favoriteProductsArr.includes(productID);

  const colorSwatchesAll = fields.productItem?.fields.exteriorSwatchCollection?.fields.swatches;
  const colorSwatchesTotal = colorSwatchesAll && colorSwatchesAll.length;

  const featuredExteriorColors = fields?.productItem?.fields?.featuredExteriorColors;

  let colorSwatchesCount = 0;

  if (colorSwatchesTotal) {
    colorSwatchesCount = colorSwatchesTotal - featuredExteriorColors?.length;
  }

  const priceLevel =
    fields?.productItem?.fields?.priceLevel?.fields.Value?.value &&
    (+fields?.productItem?.fields?.priceLevel?.fields.Value.value as priceLevel | null);

  const priceRange = (priceLevel: priceLevel) => {
    switch (priceLevel) {
      case 1:
        return (
          <>
            <Text
              tag="span"
              className={themeData.classes.priceLevel}
              field={{ editable: '$', value: '$' }}
            />
            <Text
              tag="span"
              className={themeData.classes.priceLevel}
              field={{ editable: '$$$$', value: '$$$$' }}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text
              tag="span"
              className={themeData.classes.priceLevel}
              field={{ editable: '$$', value: '$$' }}
            />
            <Text
              ttag="span"
              className={themeData.classes.priceLevel}
              field={{ editable: '$$$', value: '$$$' }}
            />
          </>
        );
      case 3:
        return (
          <>
            <Text
              tag="span"
              className={themeData.classes.priceLevel}
              field={{ editable: '$$$', value: '$$$' }}
            />
            <Text
              tag="span"
              className={themeData.classes.priceLevel}
              field={{ editable: '$$', value: '$$' }}
            />
          </>
        );
      case 4:
        return (
          <>
            <Text
              tag="span"
              className={themeData.classes.priceLevel}
              field={{ editable: '$$$$', value: '$$$$' }}
            />
            <Text
              ttag="span"
              className={themeData.classes.priceLevel}
              field={{ editable: '$', value: '$' }}
            />
          </>
        );
      case 5:
        return (
          <>
            <Text
              tag="span"
              className={themeData.classes.priceLevel}
              field={{ editable: '$$$$$', value: '$$$$$' }}
            />
          </>
        );
      default:
        return null;
    }
  };

  const ColorAndActions = (): JSX.Element => {
    return (
      <>
        {featuredExteriorColors?.length > 0 && (
          <div className={themeData.classes.colorSwatchesWrapper}>
            {fields.colorLabel && fields.colorLabel.value && (
              <Text tag={'h4'} field={fields.colorLabel} className={themeData.classes.colorLabel} />
            )}
            <Link href={fields.cta1Link.value.href ?? ''}>
              <a className={themeData.classes.headlineWrapper}>
                <div className={themeData.classes.swatches}>
                  {featuredExteriorColors?.map(
                    (color: Feature.EnterpriseWeb.Elements.Swatches.Swatch, index: number) => {
                      return (
                        <div key={index} className={themeData.classes.colorSwatches}>
                          <Image image={color.fields?.swatchImage} />
                        </div>
                      );
                    }
                  )}
                  {colorSwatchesCount > 0 && <div>+{colorSwatchesCount}</div>}
                </div>
              </a>
            </Link>
          </div>
        )}
        <div className={themeData.classes.actions}>
          <ButtonGroup classes={themeData.classes.buttonGroupClass} {...props} />
        </div>
      </>
    );
  };

  return (
    <div
      className={themeData.classes.productPreviewCradWrapper}
      data-component="card/productpreview"
    >
      {/* Favourite */}
      <div className="absolute top-0 right-0">
        <div
          className={classNames(
            themeData.classes.favoriteProduct,
            isFavorited ? 'favorited border-[transparent_#f26924_transparent_transparent]' : ''
          )}
          data-product-id={productID}
        >
          <SvgIcon
            icon="favorite"
            fillId="text-primary"
            size="xl"
            className={themeData.classes.favoriteIcon}
          />
        </div>
      </div>

      <div className={themeData.classes.headerWrapper}>
        <Eyebrow classes={themeData.classes.eyebrow} {...props} />
        <Link href={fields.cta1Link.value.href ?? ''}>
          <a className={themeData.classes.headlineWrapper}>
            <Headline useTag="h4" classes={themeData.classes.headline} {...props} />
          </a>
        </Link>

        {/* This is a placeholder for the ratings/price API to be configured */}
        <div className={themeData.classes.ratingsAndPriceWrapper}>
          {/* Placeholder for ratings icons */}
          <div className={themeData.classes.ratingsIconsList}>
            <SvgIcon icon="star" className={'text-primary'} />
            <SvgIcon icon="star" className={'text-primary'} />
            <SvgIcon icon="star" className={'text-primary'} />
            <SvgIcon icon="star" className={'text-primary'} />
            <SvgIcon icon="star" className="text-gray" />
          </div>

          {/* Placeholder for ratings */}
          <div className={themeData.classes.ratingsText}>
            <Text tag="h5" field={{ editable: '5.0', value: '5.0' }} />
          </div>
          {/* Price Range */}
          {priceLevel && priceLevel > 0 && (
            <div className={themeData.classes.priceText}>{priceRange(priceLevel)}</div>
          )}
        </div>
      </div>
      <div className="order-2 my-xxs self-stretch">
        <Link href={fields.cta1Link.value.href ?? ''}>
          <a className="">
            <ImagePrimary {...props} />
          </a>
        </Link>
      </div>
      <BodyCopy classes={themeData.classes.body} {...props} />
      {themeName === 'aw' ? (
        <div className={themeData.classes.awColorsandCTA}>
          <ColorAndActions />
        </div>
      ) : (
        <ColorAndActions />
      )}
    </div>
  );
};

export default withDatasourceCheck()<ProductPreviewCardProps>(ProductPreviewCard);
