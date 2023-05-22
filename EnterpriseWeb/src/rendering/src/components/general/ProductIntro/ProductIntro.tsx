// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { ImageField, Text, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { Component } from 'src/helpers/Component';
import { ProductIntroTheme } from './ProductIntro.theme';
import { Headline } from 'src/helpers/Headline';
import { ImageToggleWrapper } from 'src/helpers/ImageToggleWrapper';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { Eyebrow } from 'src/helpers/Eyebrow';
import { ButtonGroup } from 'src/helpers/ButtonGroup';
import { SvgIcon } from 'src/helpers/SvgIcon';
import ImageWrapper from 'src/helpers/Media/ImageWrapper';
import { Subheadline } from 'src/helpers/Subheadline';
import { ImagePrimary } from 'src/helpers/Media';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { ComponentProps } from 'lib/component-props';
import SingleButton from 'src/helpers/SingleButton/SingleButton';
import { Foundation } from 'src/.generated/Foundation.EnterpriseWeb.model';
import { useRouter } from 'next/router';
import { getBreakpoint, useCurrentScreenType } from 'lib/utils/get-screen-type';
import { Button } from 'src/helpers/Button';

export type ProductSwatch = Feature.EnterpriseWeb.Components.Product.ProductSwatch & {
  fields?: {
    productImageSwatch?: Feature.EnterpriseWeb.Elements.Swatches.Swatch;
  };
};

export type ProductIntroProps = Feature.EnterpriseWeb.Components.Product.ProductIntro & {
  fields?: {
    children?: ProductSwatch[];
    tabLinkToSelect: Foundation.EnterpriseWeb.Core.FieldSets.ContentAnchor;
  };
} & ComponentProps;

const ProductIntro = (props: ProductIntroProps) => {
  const router = useRouter();
  const { asPath } = router || {};
  const { fields } = props;
  const { themeName, themeData } = useTheme(ProductIntroTheme);

  const [isInterior, setIsInterior] = useState<boolean>(true);

  const [selectedSwatchColor, setSelectedSwatchColor] = useState<number | undefined>();
  const [colorSwatches, setColorSwatches] = useState<ProductSwatch[] | undefined>();

  const { currentScreenWidth } = useCurrentScreenType();

  function updateToggleState(state: boolean) {
    setIsInterior(state);
  }

  const swatchHeading =
    themeName === 'rba'
      ? fields?.interiorSwatchesHeadline
      : isInterior
      ? fields?.interiorSwatchesHeadline
      : fields?.exteriorSwatchesHeadline;

  const interiorColorSwatches = useMemo(() => {
    return fields?.children?.filter((_childItem: ProductSwatch) => {
      return _childItem?.fields?.interior.value;
    });
  }, [fields]);

  const exteriorColorSwatches = useMemo(() => {
    return fields?.children?.filter((_childItem: ProductSwatch) => {
      return !_childItem?.fields?.interior.value;
    });
  }, [fields]);

  useEffect(() => {
    isInterior ? setColorSwatches(interiorColorSwatches) : setColorSwatches(exteriorColorSwatches);
    if (themeName === 'aw' && fields?.children?.length) {
      setSelectedSwatchColor(0);
    }
  }, [isInterior]);

  if (!fields) return null;

  const primaryImage = !!fields?.primaryImage?.value?.src
    ? {
        image: fields?.primaryImage,
        mobileImage: fields?.primaryImageMobile,
        mobileFocusArea: fields?.primaryImageMobileFocusArea,
        additionalDesktopClasses: 'p-m flex justify-center items-center max-h-[534px]',
        additionalMobileClasses: 'flex justify-center items-center p-m',
      }
    : false;

  const tabId =
    fields?.tabLinkToSelect?.fields?.contentId?.value || props?.fields?.tabLinkToSelect?.id;

  const tabUrl = tabId ? `${asPath}#${tabId}` : undefined;

  function renderColorSwatches(): JSX.Element {
    if (colorSwatches?.length) {
      return (
        <>
          <Subheadline
            useTag="div"
            classes={themeData.classes.swatchHeadline}
            fields={{
              subheadlineText: swatchHeading || { value: '' },
            }}
          />

          <ul className="mb-m flex gap-m">
            {colorSwatches?.map((_childItem, index: number) => {
              return (
                <li key={`colorswatch-${index}`} className="flex flex-col items-center">
                  <span
                    tabIndex={themeName === 'aw' ? 0 : -1}
                    onClick={() => {
                      if (themeName === 'aw') {
                        setSelectedSwatchColor(index);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (themeName === 'aw' && (e.code === 'Enter' || e.code === 'Space')) {
                        setSelectedSwatchColor(index);
                      }
                    }}
                    className={classNames(
                      'h-[46px] w-[46px]  rounded-full p-[2px]',
                      selectedSwatchColor === index && themeName === 'aw' ? 'border-2' : '',
                      themeName === 'aw' ? 'cursor-pointer' : ''
                    )}
                  >
                    <span className="h-[38px] w-[38px] rounded-full  [&_img]:rounded-full">
                      <ImagePrimary
                        imageLayout="responsive"
                        fields={{
                          primaryImage: _childItem?.fields?.productImageSwatch?.fields
                            ?.swatchImage as ImageField,
                          primaryImageMobile: _childItem?.fields?.productImageSwatch?.fields
                            ?.swatchImage as ImageField,
                          primaryImageCaption: {
                            value: '',
                          },
                        }}
                      />
                    </span>
                  </span>

                  <Subheadline
                    useTag="span"
                    fields={{
                      subheadlineText: _childItem?.fields?.productImageSwatch?.fields
                        ?.swatchName || {
                        value: '',
                      },
                    }}
                    classes={themeData.classes.swatchTitle}
                  />
                </li>
              );
            })}
          </ul>
        </>
      );
    } else return <></>;
  }

  return (
    <Component variant="lg" dataComponent="general/productintro" {...props}>
      <div className={themeData.classes.imageColClasses}>
        {themeName === 'aw' ? (
          <ImageToggleWrapper
            fields={{
              primaryImage: fields.primaryImage,
              secondaryImage: fields.secondaryImage,
              primaryImageMobile: fields?.primaryImageMobile,
              secondaryImageMobile: fields?.secondaryImageMobile,
              primaryImageMobileFocusArea: fields?.primaryImageMobileFocusArea,
              secondaryImageMobileFocusArea: fields?.secondaryImageMobileFocusArea,
            }}
            colorSwatches={{
              interiorColorSwatches: interiorColorSwatches,
              exteriorColorSwatches: exteriorColorSwatches,
            }}
            selectedSwatchIndex={selectedSwatchColor}
            updateToggleState={updateToggleState}
            ratio={'square'}
          />
        ) : (
          <>
            {primaryImage && (
              <ImageWrapper {...primaryImage} imageLayout="intrinsic" ratio="square" />
            )}
            {/* RBA Desktop custom CTA for tab switch */}
            {currentScreenWidth > getBreakpoint('md') && (
              <SingleButton
                fields={{
                  cta1Icon: {
                    id: 'f8ad4587-51a4-4e66-8eec-b448f78b4cb2',
                    url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Augmented-Reality',
                    name: 'Augmented Reality',
                    displayName: 'Augmented Reality',
                    fields: {
                      Value: {
                        value: 'arrow',
                      },
                    },
                    templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                    templateName: 'Enum',
                  },
                  cta1Link: {
                    value: {
                      href: tabUrl,
                      text: fields?.tabLinkText?.value,
                      anchor: '',
                      linktype: 'internal',
                      class: '',
                      title: '',
                      target: '',
                      querystring: '',
                      id: '{BD66C47E-42B0-4EDD-BAD3-4BC981C05E5D}',
                    },
                  },
                  cta1Style: {
                    id: '8aedd89c-e161-41d4-b773-6a6097a19372',
                    url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Secondary',
                    name: 'Secondary',
                    displayName: 'Secondary',
                    fields: {
                      Value: {
                        value: 'secondary',
                      },
                    },
                    templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                    templateName: 'Enum',
                  },
                  cta1ModalLinkText: {
                    value: '',
                  },
                }}
              />
            )}
          </>
        )}
      </div>
      <div className={themeData.classes.descriptionColClasses}>
        {currentScreenWidth < getBreakpoint('md') && themeName === 'rba' && (
          <>
            <div
              className={classNames(
                themeData.classes.buttonGroupClass?.wrapper,
                'mb-s flex items-start space-y-s md:flex-row md:items-center md:space-x-4 md:space-y-0'
              )}
            >
              {fields?.cta1Link && (
                <Button
                  field={fields?.cta1Link}
                  variant={fields?.cta1Style}
                  icon={fields?.cta1Icon}
                  modalId={
                    (
                      fields?.cta1Modal as unknown as Feature.EnterpriseWeb.Components.Modal.GenericModal.GenericModal
                    )?.fields?.modalId?.value
                  }
                  modalLinkText={fields?.cta1ModalLinkText}
                  classes={classNames(themeData.classes.buttonGroupClass?.cta1Classes, 'mr-m')}
                />
              )}

              {currentScreenWidth < getBreakpoint('md') && (
                <SingleButton
                  fields={{
                    cta1Icon: {
                      id: 'f8ad4587-51a4-4e66-8eec-b448f78b4cb2',
                      url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Augmented-Reality',
                      name: 'Augmented Reality',
                      displayName: 'Augmented Reality',
                      fields: {
                        Value: {
                          value: 'arrow',
                        },
                      },
                      templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                      templateName: 'Enum',
                    },
                    cta1Link: {
                      value: {
                        href: tabUrl,
                        text: fields?.tabLinkText?.value,
                        anchor: '',
                        linktype: 'internal',
                        class: '',
                        title: '',
                        target: '',
                        querystring: '',
                        id: '{BD66C47E-42B0-4EDD-BAD3-4BC981C05E5D}',
                      },
                    },
                    cta1Style: {
                      id: '8aedd89c-e161-41d4-b773-6a6097a19372',
                      url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Secondary',
                      name: 'Secondary',
                      displayName: 'Secondary',
                      fields: {
                        Value: {
                          value: 'secondary',
                        },
                      },
                      templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                      templateName: 'Enum',
                    },
                    cta1ModalLinkText: {
                      value: '',
                    },
                  }}
                />
              )}

              {fields?.cta2Link && (
                <Button
                  field={fields?.cta2Link}
                  variant={fields?.cta2Style}
                  icon={fields?.cta2Icon}
                  modalId={
                    (
                      fields?.cta2Modal as unknown as Feature.EnterpriseWeb.Components.Modal.GenericModal.GenericModal
                    )?.fields?.modalId?.value
                  }
                  modalLinkText={fields?.cta2ModalLinkText}
                  classes={themeData.classes.buttonGroupClass?.cta2Classes}
                />
              )}
            </div>
          </>
        )}
        {themeName === 'aw' && <Eyebrow classes={themeData.classes.eyebrow} {...props} />}
        <Headline classes={themeData.classes.headline} {...props} />
        <BodyCopy classes={themeData.classes.bodyClass} {...props} />

        {themeName === 'rba' && renderColorSwatches()}
        {/* This is a placeholder for the ratings/price API to be configured */}
        <div className={themeData.classes.ratingsAndPriceWrapper}>
          {/* Placeholder for ratings icons */}
          <div className={themeData.classes.ratingsIconsList}>
            <SvgIcon
              icon="star"
              className={`${themeName === 'aw' ? 'text-secondary' : 'text-primary'} `}
            />
            <SvgIcon
              icon="star"
              className={`${themeName === 'aw' ? 'text-secondary' : 'text-primary'} `}
            />
            <SvgIcon
              icon="star"
              className={`${themeName === 'aw' ? 'text-secondary' : 'text-primary'} `}
            />
            <SvgIcon
              icon="star"
              className={`${themeName === 'aw' ? 'text-secondary' : 'text-primary'} `}
            />
            <SvgIcon icon="star" className="text-grey" />
          </div>

          {/* Placeholder for ratings */}
          <div className={themeData.classes.ratingsText}>
            <Text tag="h5" field={{ editable: '5.0(12)', value: '5.0(12)' }} />
          </div>
          {/* Placeholder for price */}
          <div className={themeData.classes.priceText}>
            <Text tag="h6" field={{ editable: '$$$$$', value: '$$$$$' }} />
          </div>
        </div>
        {themeName === 'aw' ? (
          <ButtonGroup classes={themeData.classes.buttonGroupClass} {...props} />
        ) : (
          <>
            {currentScreenWidth > getBreakpoint('md') && (
              <>
                {currentScreenWidth < getBreakpoint('md') && (
                  <SingleButton
                    fields={{
                      cta1Icon: {
                        id: 'f8ad4587-51a4-4e66-8eec-b448f78b4cb2',
                        url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Augmented-Reality',
                        name: 'Augmented Reality',
                        displayName: 'Augmented Reality',
                        fields: {
                          Value: {
                            value: 'arrow',
                          },
                        },
                        templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                        templateName: 'Enum',
                      },
                      cta1Link: {
                        value: {
                          href: tabUrl,
                          text: fields?.tabLinkText?.value,
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          target: '',
                          querystring: '',
                          id: '{BD66C47E-42B0-4EDD-BAD3-4BC981C05E5D}',
                        },
                      },
                      cta1Style: {
                        id: '8aedd89c-e161-41d4-b773-6a6097a19372',
                        url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Secondary',
                        name: 'Secondary',
                        displayName: 'Secondary',
                        fields: {
                          Value: {
                            value: 'secondary',
                          },
                        },
                        templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                        templateName: 'Enum',
                      },
                      cta1ModalLinkText: {
                        value: '',
                      },
                    }}
                  />
                )}
                <ButtonGroup classes={themeData.classes.buttonGroupClass} {...props} />
              </>
            )}
          </>
        )}

        {themeName === 'aw' && (
          <>
            {renderColorSwatches()}
            {/* AW custom cta for tab switch */}
            <SingleButton
              fields={{
                cta1Icon: {
                  id: 'f8ad4587-51a4-4e66-8eec-b448f78b4cb2',
                  url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Augmented-Reality',
                  name: 'Augmented Reality',
                  displayName: 'Augmented Reality',
                  fields: {
                    Value: {
                      value: 'arrow',
                    },
                  },
                  templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                  templateName: 'Enum',
                },
                cta1Link: {
                  value: {
                    href: tabUrl,
                    text: fields?.tabLinkText?.value,
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '',
                    querystring: '',
                    id: '{BD66C47E-42B0-4EDD-BAD3-4BC981C05E5D}',
                  },
                },
                cta1Style: {
                  id: '8aedd89c-e161-41d4-b773-6a6097a19372',
                  url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Secondary',
                  name: 'Secondary',
                  displayName: 'Secondary',
                  fields: {
                    Value: {
                      value: 'tertiary',
                    },
                  },
                  templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                  templateName: 'Enum',
                },
                cta1ModalLinkText: {
                  value: '',
                },
              }}
            />
          </>
        )}
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<ProductIntroProps>(ProductIntro);
