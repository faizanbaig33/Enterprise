import { Result } from '@coveo/headless';
import { PhotoItemWithDetailProps } from './PhotoItemWithDetail';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { getResultItemIndex } from '../Coveo/ResultTemplatesManager/TemplateUtils';
import { getEnum } from 'lib/utils';

export const getPhotoItemProps = (
  props: Partial<Feature.EnterpriseWeb.Data.Photos.Photo | Result>,
  isInstanceOfCoveoResponse: boolean,
  resultItems?: Feature.EnterpriseWeb.Elements.Search.GridResultItem[]
): PhotoItemWithDetailProps | null => {
  if (isInstanceOfCoveoResponse && resultItems && 'raw' in props) {
    if (!props.raw) return null;

    const resultItemIndex = getResultItemIndex(resultItems, props.raw.sc_templateid as string);

    const resultItemToConsider = resultItems[resultItemIndex];

    const renderingFields = {
      headline: props.raw[getEnum<string>(resultItemToConsider.fields?.headingField) || ''],
      fullImage: props.raw[getEnum<string>(resultItemToConsider.fields?.imageField) || ''],
      fullImagetitle: props.raw[getEnum<string>(resultItemToConsider.fields?.titleField) || ''],
      fullImageWidth: parseInt(
        props.raw[
          `${[getEnum<string>(resultItemToConsider.fields?.imageField) || '']}_width`
        ] as string
      ),
      fullImageHeight: parseInt(
        props.raw[
          `${[getEnum<string>(resultItemToConsider.fields?.imageField) || '']}_height`
        ] as string
      ),
      fullImageAlt: parseInt(
        props.raw[
          `${[getEnum<string>(resultItemToConsider.fields?.imageField) || '']}_alt`
        ] as string
      ),
      relatedPages: JSON.parse(
        props.raw[getEnum<string>(resultItemToConsider.fields?.relatedPagesField) || ''] as string
      ),
    };

    return {
      fields: {
        imageWrapper: {
          image: {
            value: {
              src: `${renderingFields.fullImage}`,
              width: renderingFields.fullImageWidth,
              height: renderingFields.fullImageHeight,
              alt: renderingFields.fullImageAlt,
            },
          },
          mobileImage: {
            value: {
              src: `${renderingFields.fullImage}`,
              width: renderingFields.fullImageWidth,
              height: renderingFields.fullImageHeight,
              alt: renderingFields.fullImageAlt,
            },
          },
        },
        headlineText: { value: renderingFields.fullImagetitle as string },
        superscriptCTA: { value: {} },
        relatedPages: renderingFields.relatedPages.map((pageItem: any) => {
          return { pageTitle: pageItem.pageTitle, url: pageItem.url };
        }),
        photoItemClasses: '',
      },
    };
  } else if (!isInstanceOfCoveoResponse && 'fields' in props) {
    return {
      fields: {
        imageWrapper: {
          image: props.fields?.fullImage,
          mobileImage: props.fields?.fullImage,
        },
        headlineText: props.fields?.photoTitle || { value: '' },
        superscriptCTA: { value: {} },
        relatedPages: props.fields?.relatedPages.map((pageItem: any) => {
          return { pageTitle: pageItem.fields?.pageTitle.value, url: pageItem.url };
        }),
        photoItemClasses: '',
      },
    };
  }

  return null;
};
