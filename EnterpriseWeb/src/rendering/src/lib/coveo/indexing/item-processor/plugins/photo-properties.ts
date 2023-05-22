import { SitecoreIds } from 'lib/constants';
import { normalizeSitecoreDateString } from 'lib/utils/string-utils';
import { IndexableItem, SitemapItem } from '../..';

export class PhotoProperties {
  order = 30;

  async exec(siteMapItem: SitemapItem, indexableItem: IndexableItem) {
    const photoTemplateId = SitecoreIds.Feature.Data.Photos.Photo.TemplateId.replace(/-/g, '');
    if (indexableItem.templateId.indexOf(photoTemplateId) == -1) {
      return siteMapItem;
    }

    type RelatedPage = {
      url: string;
      pageTitle: string;
    };

    type RelatedPages = Array<RelatedPage>;

    // @TODO: Currently, this will only support generating "en" languages.

    const lastUpdated = indexableItem.fields.getDateField('lastUpdated');
    if (lastUpdated && lastUpdated.value) {
      const normalized = normalizeSitecoreDateString(lastUpdated.value);
      siteMapItem.lastmod = new Date(normalized);
    }

    siteMapItem.metaData['siteLanguage'] = indexableItem.language;

    siteMapItem.metaData['siteName'] = indexableItem.siteName;

    const photoTitle = indexableItem.fields.getTextField('photoTitle');
    if (photoTitle) {
      siteMapItem.metaData[photoTitle.name] = photoTitle.value;
    }

    const thumbnailImage = indexableItem.fields.getImageField('thumbnailImage');
    if (thumbnailImage) {
      siteMapItem.metaData[thumbnailImage.name] = thumbnailImage.src;
      siteMapItem.metaData[`${thumbnailImage.name}_alt`] = thumbnailImage.alt;
      siteMapItem.metaData[`${thumbnailImage.name}_height`] = thumbnailImage.height;
      siteMapItem.metaData[`${thumbnailImage.name}_width`] = thumbnailImage.width;
    }

    const fullImage = indexableItem.fields.getImageField('fullImage');
    if (fullImage) {
      siteMapItem.metaData[fullImage.name] = fullImage.src;
      siteMapItem.metaData[`${fullImage.name}_alt`] = fullImage.alt;
      siteMapItem.metaData[`${fullImage.name}_height`] = fullImage.height;
      siteMapItem.metaData[`${fullImage.name}_width`] = fullImage.width;
    }

    const relatedPages = indexableItem.fields.getMultilistField('relatedPages');
    if (relatedPages && relatedPages.targetItems.length > 0) {
      const value: RelatedPages = relatedPages.targetItems?.map(
        (targetItem): RelatedPage => ({
          url: targetItem.url,
          pageTitle: targetItem.fields.getTextField('pageTitle')?.value || '',
        })
      );
      if (value) {
        siteMapItem.metaData[relatedPages.name] = JSON.stringify(value);
      }
    }

    const productSeries = indexableItem.fields.getMultilistField('productSeries');
    if (productSeries && productSeries.targetItems.length > 0) {
      const value = productSeries.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[productSeries.name] = value.join(';');
      }
    }

    const windowType = indexableItem.fields.getMultilistField('windowType');
    if (windowType && windowType.targetItems.length > 0) {
      const value = windowType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[windowType.name] = value.join(';');
      }
    }

    const doorType = indexableItem.fields.getMultilistField('doorType');
    if (doorType && doorType.targetItems.length > 0) {
      const value = doorType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[doorType.name] = value.join(';');
      }
    }

    const view = indexableItem.fields.getMultilistField('view');
    if (view && view.targetItems.length > 0) {
      const value = view.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[view.name] = value.join(';');
      }
    }

    const roomType = indexableItem.fields.getMultilistField('roomType');
    if (roomType && roomType.targetItems.length > 0) {
      const value = roomType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[roomType.name] = value.join(';');
      }
    }

    const projectType = indexableItem.fields.getMultilistField('projectType');
    if (projectType && projectType.targetItems.length > 0) {
      const value = projectType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[projectType.name] = value.join(';');
      }
    }

    const buildingSubType = indexableItem.fields.getMultilistField('buildingSubType');
    if (buildingSubType && buildingSubType.targetItems.length > 0) {
      const value = buildingSubType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[buildingSubType.name] = value.join(';');
      }
    }

    const buildingType = indexableItem.fields.getMultilistField('buildingType');
    if (buildingType && buildingType.targetItems.length > 0) {
      const value = buildingType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[buildingType.name] = value.join(';');
      }
    }

    const excludeFromSearch = indexableItem.fields.getCheckboxField('excludeFromSearch');
    if (excludeFromSearch) {
      siteMapItem.metaData[excludeFromSearch.name] = excludeFromSearch.boolValue ? 'true' : 'false';
    }

    return siteMapItem;
  }
}

export const photoPropertiesPlugin = new PhotoProperties();
