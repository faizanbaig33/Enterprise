import { SitecoreIds } from 'lib/constants';
import { normalizeSitecoreDateString } from 'lib/utils/string-utils';
import { IndexableItem, SitemapItem } from '../..';

export class TechDocumentProperties {
  order = 20;

  async exec(siteMapItem: SitemapItem, indexableItem: IndexableItem) {
    const techDocumentTemplateId =
      SitecoreIds.Feature.Data.Documents.TechnicalDocument.TemplateId.replace(/-/g, '');
    if (indexableItem.templateId.indexOf(techDocumentTemplateId) == -1) {
      return siteMapItem;
    }

    // @TODO: Currently, this will only support generating "en" languages.

    const lastUpdated = indexableItem.fields.getDateField('lastUpdated');
    if (lastUpdated && lastUpdated.value) {
      const normalized = normalizeSitecoreDateString(lastUpdated.value);
      siteMapItem.lastmod = new Date(normalized);
    }

    siteMapItem.metaData['siteLanguage'] = indexableItem.language;

    siteMapItem.metaData['siteName'] = indexableItem.siteName;

    const eyebrow = indexableItem.fields.getTextField('documentEyebrow');
    if (eyebrow) {
      siteMapItem.metaData[eyebrow.name] = eyebrow.value;
    }

    const documentTitle = indexableItem.fields.getTextField('doucmentTitle');
    if (documentTitle) {
      siteMapItem.metaData[documentTitle.name] = documentTitle.value;
    }

    const documentDescription = indexableItem.fields.getRichTextField('documentDescription');
    if (documentDescription) {
      siteMapItem.metaData[documentDescription.name] = documentDescription.value;
    }

    const documentNumber = indexableItem.fields.getTextField('documentNumber');
    if (documentNumber) {
      siteMapItem.metaData[documentNumber.name] = documentNumber.value;
    }

    const document = indexableItem.fields.getFileField('document');
    if (document) {
      siteMapItem.metaData[document.name] = document.src;
      siteMapItem.url = document.src;
      siteMapItem.loc = document.src;
    }

    //hard-coded as there is an issue with FielField and ticket has been opened with Sitecore Support.
    siteMapItem.url =
      'https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/shared/PDFs/sizing-windows--a-series-casement.pdf';
    siteMapItem.loc =
      'https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/shared/PDFs/sizing-windows--a-series-casement.pdf';

    siteMapItem.metaData['sitesearchtopic'] = 'Technical Documents';

    const documentType = indexableItem.fields.getLookupField('documentType');
    if (documentType) {
      const value = documentType.targetItem?.fields.getTextField('title');
      if (value) {
        siteMapItem.metaData[documentType.name] = value.value;
      }
    }

    const site = indexableItem.fields.getMultilistField('documentSite');
    if (site && site.targetItems.length > 0) {
      const value = site.targetItems?.map((targetItem) => targetItem.name);
      if (value) {
        siteMapItem.metaData[site.name] = value.join(';');
      }
    }

    const language = indexableItem.fields.getMultilistField('documentLanguage');
    if (language && language.targetItems.length > 0) {
      const value = language.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[language.name] = value.join(';');
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

    const productOptions = indexableItem.fields.getMultilistField('productOptions');
    if (productOptions && productOptions.targetItems.length > 0) {
      const value = productOptions.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[productOptions.name] = value.join(';');
      }
    }

    const awningType = indexableItem.fields.getMultilistField('awningType');
    if (awningType && awningType.targetItems.length > 0) {
      const value = awningType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[awningType.name] = value.join(';');
      }
    }

    const casementType = indexableItem.fields.getMultilistField('casementType');
    if (casementType && casementType.targetItems.length > 0) {
      const value = casementType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[casementType.name] = value.join(';');
      }
    }

    const doubleHungType = indexableItem.fields.getMultilistField('doubleHungType');
    if (doubleHungType && doubleHungType.targetItems.length > 0) {
      const value = doubleHungType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[doubleHungType.name] = value.join(';');
      }
    }

    const specialtyType = indexableItem.fields.getMultilistField('specialtyType');
    if (specialtyType && specialtyType.targetItems.length > 0) {
      const value = specialtyType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[specialtyType.name] = value.join(';');
      }
    }

    const stormDoorType = indexableItem.fields.getMultilistField('stormDoorType');
    if (stormDoorType && stormDoorType.targetItems.length > 0) {
      const value = stormDoorType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[stormDoorType.name] = value.join(';');
      }
    }

    const environmentDocumentType =
      indexableItem.fields.getMultilistField('environmentDocumentType');
    if (environmentDocumentType && environmentDocumentType.targetItems.length > 0) {
      const value = environmentDocumentType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[environmentDocumentType.name] = value.join(';');
      }
    }

    const installationMethods = indexableItem.fields.getMultilistField('installationMethods');
    if (installationMethods && installationMethods.targetItems.length > 0) {
      const value = installationMethods.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[installationMethods.name] = value.join(';');
      }
    }

    const installationGuideType = indexableItem.fields.getMultilistField('installationGuideType');
    if (installationGuideType && installationGuideType.targetItems.length > 0) {
      const value = installationGuideType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[installationGuideType.name] = value.join(';');
      }
    }

    const performanceDocumentType =
      indexableItem.fields.getMultilistField('performanceDocumentType');
    if (performanceDocumentType && performanceDocumentType.targetItems.length > 0) {
      const value = performanceDocumentType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[performanceDocumentType.name] = value.join(';');
      }
    }

    const serviceGuideType = indexableItem.fields.getMultilistField('serviceGuideType');
    if (serviceGuideType && serviceGuideType.targetItems.length > 0) {
      const value = serviceGuideType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[serviceGuideType.name] = value.join(';');
      }
    }

    const doorSwing = indexableItem.fields.getMultilistField('doorSwing');
    if (doorSwing && doorSwing.targetItems.length > 0) {
      const value = doorSwing.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[doorSwing.name] = value.join(';');
      }
    }

    const sizingDocumentType = indexableItem.fields.getMultilistField('sizingDocumentType');
    if (sizingDocumentType && sizingDocumentType.targetItems.length > 0) {
      const value = sizingDocumentType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[sizingDocumentType.name] = value.join(';');
      }
    }

    const joiningType = indexableItem.fields.getMultilistField('joiningType');
    if (joiningType && joiningType.targetItems.length > 0) {
      const value = joiningType.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[joiningType.name] = value.join(';');
      }
    }

    const productStatus = indexableItem.fields.getMultilistField('productStatus');
    if (productStatus && productStatus.targetItems.length > 0) {
      const value = productStatus.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[productStatus.name] = value.join(';');
      }
    }

    const productBrand = indexableItem.fields.getMultilistField('productBrand');
    if (productBrand && productBrand.targetItems.length > 0) {
      const value = productBrand.targetItems?.map(
        (targetItem) => targetItem.fields.getTextField('title')?.value
      );
      if (value) {
        siteMapItem.metaData[productBrand.name] = value.join(';');
      }
    }

    const excludeFromSearch = indexableItem.fields.getCheckboxField('excludeFromSearch');
    if (excludeFromSearch) {
      siteMapItem.metaData[excludeFromSearch.name] = excludeFromSearch.boolValue ? 'true' : 'false';
    }

    return siteMapItem;
  }
}

export const techDocumentPropertiesPlugin = new TechDocumentProperties();
