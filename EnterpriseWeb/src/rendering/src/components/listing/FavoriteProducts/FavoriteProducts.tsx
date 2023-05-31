// Global
import { useState, useEffect } from 'react';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import classNames from 'classnames';

// Components
import { Component } from 'src/helpers/Component';
import { FavoriteProductsTheme } from './FavoriteProducts.theme';
import { Headline } from 'src/helpers/Headline';
import SingleButton from 'src/helpers/SingleButton/SingleButton';
import { ImagePrimary, Image } from 'src/helpers/Media';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { RichTextWrapper } from 'src/helpers/RichTextWrapper';
import { NoResults } from './NoResults';

type priceLevel = 1 | 2 | 3 | 4 | 5;

export type FavoriteProductsProps =
  Feature.EnterpriseWeb.Components.Listing.Favorites.FavoriteProducts;
const FavoriteProducts = (props: FavoriteProductsProps) => {
  const favoriteProductIDs = props.favoriteProducts;
  const hasFavoriteProduct = favoriteProductIDs && favoriteProductIDs.length ? true : false;
  const { fields } = props;
  const { themeData } = useTheme(FavoriteProductsTheme);
  const [favoriteProductDetailsArray, setFavoriteProductDetailsArray] = useState([]);

  // to fetch Favorite Products
  const fetchFavoriteProducts = async () => {
    try {
      const response = await fetch('/api/favoriteProductsAPI', {
        method: 'POST',
        body: JSON.stringify({ favoriteProducts: favoriteProductIDs }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        const productData = data.productData;
        setFavoriteProductDetailsArray(productData);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const handlePrint = () => {
    const printStyles = `
    @media print {
      header,
      footer,
      .react-tabs__tab-list,
      .no-print,
      section[data-component="hero/herotwocolumn"],
      section[data-component="hero/tabsgeneralcontent"] h2 {
        display: none;
      }

      .printSection {
        display: inherit !important;
      }
    }
  `;

    const style = document.createElement('style');
    style.innerHTML = printStyles;

    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  const colorSwatchesAll = fields.productItem?.fields.exteriorSwatchCollection?.fields.swatches;
  const colorSwatchesTotal = colorSwatchesAll && colorSwatchesAll.length;

  const featuredExteriorColors = fields?.productItem?.fields?.featuredExteriorColors;

  let colorSwatchesCount = 0;

  if (colorSwatchesTotal) {
    colorSwatchesCount = colorSwatchesTotal - featuredExteriorColors?.length;
  }

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

  const ColorAndActions = ({ favProduct }: any): JSX.Element => {
    return (
      <>
        {featuredExteriorColors?.length > 0 && (
          <div className={themeData.classes.colorSwatchesWrapper}>
            <Text tag={'h4'} field={{ value: 'Color' }} className={themeData.classes.colorLabel} />

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
        {favProduct.productDetailPageLink.text && (
          <div className={themeData.classes.actions}>
            <SingleButton
              classes={
                (themeData.classes.buttonGroupClass,
                { wrapper: 'mb-0 md:mb-s', cta1Classes: 'font-bold' })
              }
              fields={{
                cta1Link: {
                  value: {
                    href: favProduct.productDetailPageLink.url,
                    text: favProduct.productDetailPageLink.text,
                    anchor: favProduct.productDetailPageLink.anchor,
                    target: favProduct.productDetailPageLink.target,
                  },
                },
                cta1ModalLinkText: {
                  value: '',
                },
                cta1Style: {
                  id: '',
                  url: '',
                  name: 'Primary',
                  displayName: 'Primary',
                  fields: {
                    Value: {
                      value: 'primary',
                    },
                  },
                  templateId: '',
                  templateName: 'Enum',
                },
                cta1Icon: {
                  id: '',
                  url: '',
                  name: 'Arrow',
                  displayName: 'Arrow',
                  fields: {
                    Value: {
                      value: 'arrow',
                    },
                  },
                  templateId: '',
                  templateName: 'Enum',
                },
              }}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <Component variant="lg" dataComponent="listing/favoriteproducts" {...props}>
      <div className="printSection col-span-12 flex justify-between">
        <Headline useTag="h4" classes={themeData.classes.mainheadline} {...props} />
        {hasFavoriteProduct && (
          <div
            onClick={handlePrint}
            className="no-print flex cursor-pointer items-center text-body text-primary"
          >
            <SvgIcon icon="pdf-aw" className="mr-xxs" />
            Print
          </div>
        )}
      </div>
      <div className="col-span-12">
        {hasFavoriteProduct ? (
          // Favorite Products
          <div className="printSection grid grid-cols-1 gap-4 ml:grid-cols-3">
            {favoriteProductDetailsArray.map((favProduct: any, index: number) => {
              const productID = favProduct.productId.value;
              const isFavorited = favoriteProductIDs.includes(productID);
              const priceLevel =
                favProduct.priceLevel.targetItem &&
                favProduct.priceLevel.targetItem.priceLevelText.value &&
                (+favProduct.priceLevel.targetItem.priceLevelText.value as priceLevel | null);
              return (
                <div key={index} className="mb-m">
                  <div className={themeData.classes.productPreviewCradWrapper}>
                    {/* Favourite */}
                    <div className="absolute top-0 right-0">
                      <div
                        className={classNames(
                          themeData.classes.favoriteProduct,
                          isFavorited
                            ? ' favorite-product favorited border-[transparent_#f26924_transparent_transparent]'
                            : ''
                        )}
                        data-product-id={favProduct.productId.value}
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
                      <Text
                        tag="h4"
                        className={themeData.classes.eyebrow}
                        field={{ value: favProduct.productSeries.value }}
                      />
                      <Link href={fields.cta1Link.value.href ?? ''}>
                        <a className={themeData.classes.headlineWrapper}>
                          <Text
                            useTag="h4"
                            className={themeData.classes.headline}
                            field={{ value: favProduct.productName.value }}
                          />
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
                          <div className={themeData.classes.priceText}>
                            {priceRange(priceLevel)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="order-2 my-xxs self-stretch">
                      <Link href={fields.cta1Link.value.href ?? ''}>
                        <a className="">
                          <ImagePrimary
                            fields={{
                              primaryImageCaption: {
                                value: '',
                              },
                              primaryImage: { value: favProduct.productImage },
                              primaryImageMobile: { value: favProduct.productImageMobile },
                              primaryImageMobileFocusArea:
                                favProduct.primaryImageMobileFocusArea &&
                                favProduct.primaryImageMobileFocusArea.targetItem.value.value
                                  ? {
                                      id: '',
                                      url: '',
                                      name: favProduct.primaryImageMobileFocusArea.targetItem.value
                                        .value,
                                      displayName:
                                        favProduct.primaryImageMobileFocusArea.targetItem.value
                                          .value,
                                      fields: {
                                        Value: {
                                          value:
                                            favProduct.primaryImageMobileFocusArea.targetItem.value
                                              .value,
                                        },
                                      },
                                    }
                                  : {
                                      id: '',
                                      url: '',
                                      name: 'Center',
                                      displayName: 'Center',
                                      fields: {
                                        Value: {
                                          value: 'center',
                                        },
                                      },
                                      templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                                      templateName: 'Enum',
                                    },
                            }}
                          />
                        </a>
                      </Link>
                    </div>
                    <RichTextWrapper
                      field={{ value: favProduct.productDescription.value }}
                      classes={themeData.classes.body}
                    />
                    <div className={themeData.classes.awColorsandCTA}>
                      <ColorAndActions favProduct={favProduct} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // No Favorite Product
          <NoResults fields={fields} />
        )}
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<FavoriteProductsProps>(FavoriteProducts);
