import { SitecoreIds } from 'lib/constants';
import { normalizeSitecoreDateString } from 'lib/utils/string-utils';
import { ChangeFrequency, IndexableItem, isChangeFrequency, SitemapItem } from '../..';

export class PageProperties {
  order = 10;

  async exec(siteMapItem: SitemapItem, indexableItem: IndexableItem) {
    const basePageId = SitecoreIds.Foundation.Core.BaseTemplates.Pages._BasePage.replace(/-/g, '');
    if (indexableItem.allTemplateIds.indexOf(basePageId) == -1) {
      return siteMapItem;
    }

    // @TODO: Currently, this will only support generating "en" languages.

    const lastUpdated = indexableItem.fields.getDateField('lastUpdated');
    if (lastUpdated && lastUpdated.value) {
      const normalized = normalizeSitecoreDateString(lastUpdated.value);
      siteMapItem.lastmod = new Date(normalized);
    }

    const priority = indexableItem.fields.getLookupField('priority');
    if (priority) {
      const value = Number.parseFloat(
        priority.targetItem?.fields.getTextField('Value')?.value ?? ''
      );
      if (!isNaN(value)) {
        siteMapItem.priority = value;
      }
    }

    const changeFrequency = indexableItem.fields.getLookupField('changeFrequency');
    if (changeFrequency) {
      const value = changeFrequency.targetItem?.fields.getTextField('Value')?.value ?? '';
      if (isChangeFrequency(value)) {
        siteMapItem.changefreq = value as ChangeFrequency;
      }
    }

    siteMapItem.metaData['siteLanguage'] = indexableItem.language;

    siteMapItem.metaData['siteName'] = indexableItem.siteName;

    const eyebrow = indexableItem.fields.getTextField('eyebrow');
    if (eyebrow) {
      siteMapItem.metaData[eyebrow.name] = eyebrow.value;
    }

    const siteSearchHeadline = indexableItem.fields.getTextField('siteSearchHeadline');
    if (siteSearchHeadline) {
      siteMapItem.metaData[siteSearchHeadline.name] = siteSearchHeadline.value;
    }

    const siteSearchDescription = indexableItem.fields.getRichTextField('siteSearchDescription');
    if (siteSearchDescription) {
      siteMapItem.metaData[siteSearchDescription.name] = siteSearchDescription.value;
    }

    const siteSearchImage = indexableItem.fields.getImageField('siteSearchImage');
    if (siteSearchImage) {
      siteMapItem.metaData[siteSearchImage.name] = siteSearchImage.src;
      siteMapItem.metaData[`${siteSearchImage.name}_alt`] = siteSearchImage.alt;
      siteMapItem.metaData[`${siteSearchImage.name}_height`] = siteSearchImage.height;
      siteMapItem.metaData[`${siteSearchImage.name}_width`] = siteSearchImage.width;
    }

    const siteSearchTopic = indexableItem.fields.getLookupField('siteSearchTopic');
    if (siteSearchTopic) {
      const value = siteSearchTopic.targetItem?.fields.getTextField('title');
      if (value) {
        siteMapItem.metaData[siteSearchTopic.name] = value.value;
      }
    }

    const productType = indexableItem.fields.getMultilistField('productType');
    if (productType) {
      const value = productType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[productType.name] = value.join(';');
      }
    }

    const excludeFromSearch = indexableItem.fields.getCheckboxField('excludeFromSearch');
    if (excludeFromSearch) {
      siteMapItem.metaData[excludeFromSearch.name] = excludeFromSearch.boolValue ? 'true' : 'false';
    }

    return siteMapItem;
  }
}

export const pagePropertiesPlugin = new PageProperties();
