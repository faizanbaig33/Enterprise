import { Result } from '@coveo/headless';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { getFieldsToInclude, getResultItemIndex } from './TemplateUtils';
import Image from 'next/image';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { getEnum } from 'lib/utils';
import { Headline } from 'src/helpers/Headline';
import { Subheadline } from 'src/helpers/Subheadline';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { ButtonGroup } from 'src/helpers/ButtonGroup';
import { Eyebrow } from 'src/helpers/Eyebrow';
import classNames from 'classnames';
import { GridStyle } from './ResultTemplatesManager';

export const getGridLayout = (
  resultItems: Feature.EnterpriseWeb.Elements.Search.GridResultItem[],
  gridLayoutClasses: { [property: string]: string },
  gridStyle: GridStyle
) => {
  const fieldsToInclude = getFieldsToInclude(resultItems, 'grid');

  const getImageAttributes = (imageField: string | undefined) => {
    if (imageField) {
      fieldsToInclude.push(`${imageField}_width`);
      fieldsToInclude.push(`${imageField}_height`);
      fieldsToInclude.push(`${imageField}_alt`);
    }
  };

  // Get image attributes
  resultItems.forEach((item) => {
    if (item.fields?.thumbnailImageField) {
      getImageAttributes(getEnum<string>(item.fields?.thumbnailImageField));
    }
    if (item.fields?.imageField) {
      getImageAttributes(getEnum<string>(item.fields?.imageField));
    }
  });

  const getRenderingFields = (
    gridStyle: GridStyle,
    _result: Result,
    _resultItemToConsider: Feature.EnterpriseWeb.Elements.Search.GridResultItem
  ) => {
    const getImageFields = () => ({
      thumbnailImage:
        _result.raw[getEnum<string>(_resultItemToConsider.fields?.thumbnailImageField) || ''],
      thumbnailImageWidth:
        _result.raw[
          `${getEnum<string>(_resultItemToConsider.fields?.thumbnailImageField) || ''}_width`
        ],
      thumbnailImageHeight:
        _result.raw[
          `${getEnum<string>(_resultItemToConsider.fields?.thumbnailImageField) || ''}_height`
        ],
      thumbnailImageAlt:
        _result.raw[
          `${getEnum<string>(_resultItemToConsider.fields?.thumbnailImageField) || ''}_alt`
        ],
    });

    const getResultFields = () => ({
      headline: {
        fields: {
          headlineText: {
            value: _result.raw[getEnum<string>(_resultItemToConsider.fields?.headingField) || ''],
          },
        },
      },
      subheadline: {
        fields: {
          subheadlineText: {
            value:
              _result.raw[getEnum<string>(_resultItemToConsider.fields?.subHeadingField) || ''],
          },
        },
      },
      description: {
        fields: {
          body: {
            value:
              _result.raw[getEnum<string>(_resultItemToConsider.fields?.descriptionField) || ''],
          },
        },
      },
      eyebrow: {
        fields: {
          eyebrowText: {
            value: _result.raw[getEnum<string>(_resultItemToConsider.fields?.eyebrowField) || ''],
          },
        },
      },
      cta: {
        fields: {
          cta1Link: {
            value: {
              href: _result.clickUri,
              title: _resultItemToConsider.fields?.ctaText.value,
              text: _resultItemToConsider.fields?.ctaText.value,
            },
          },
          cta1Icon: {
            fields: {
              Value: {
                value: 'arrow',
              },
            },
          },
          cta1Style: {
            fields: {
              Value: {
                value: 'link',
              },
            },
          },
        },
      },
    });

    switch (gridStyle) {
      case 'photo-gallery':
        return getImageFields();
      case 'result-with-image':
        return { ...getImageFields(), ...getResultFields() };
      case 'result-without-image':
        return getResultFields();
      default:
        return getImageFields();
    }
  };

  return {
    priority: 1,
    conditions: [],
    fields: ['sc_templateid', ...fieldsToInclude],
    content: (result: Result) => {
      const resultItemIndex = getResultItemIndex(resultItems, result.raw.sc_templateid as string);

      const resultItemToConsider = resultItems[resultItemIndex];

      const renderingFields: any = getRenderingFields(gridStyle, result, resultItemToConsider);

      return (
        <div
          className={classNames(
            'group relative w-full cursor-pointer',
            gridStyle !== 'photo-gallery' && gridLayoutClasses.gridItem
          )}
        >
          {renderingFields.thumbnailImage && (
            <div className={gridLayoutClasses.imageWrapper}>
              <Image
                src={`${renderingFields.thumbnailImage}`}
                layout="responsive"
                width={`${renderingFields.thumbnailImageWidth || 300}`}
                height={`${renderingFields.thumbnailImageHeight || 300}`}
                alt={`${renderingFields.thumbnailImageAlt}`}
                objectFit="cover"
              />
              {/* Render icon if gridLayout is photo-gallery */}
              {gridStyle === 'photo-gallery' && (
                <SvgIcon
                  className="-translate-t-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 rounded-full bg-black bg-opacity-[.65] p-l text-white opacity-0 transition-all ease-linear group-hover:-translate-y-1/2 group-hover:opacity-100"
                  icon="zoom-pinch"
                />
              )}
            </div>
          )}
          {gridStyle !== 'photo-gallery' && (
            <>
              <Eyebrow classes={gridLayoutClasses.eyebrow} {...renderingFields.eyebrow} />
              <Headline classes={gridLayoutClasses.headline} {...renderingFields.headline} />
              <Subheadline
                classes={gridLayoutClasses.subheadline}
                {...renderingFields.subheadline}
              />
              <BodyCopy classes={gridLayoutClasses.body} {...renderingFields.description} />
              <ButtonGroup classes={gridLayoutClasses.buttonGroup} {...renderingFields.cta} />
            </>
          )}
        </div>
      );
    },
  };
};
