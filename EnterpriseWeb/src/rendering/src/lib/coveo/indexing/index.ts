import xml from 'xmlbuilder';

/**
 * Object model of a indexable item.
 */
export type IndexableItem = {
  id: string;
  name: string;
  language: string;
  parentId: string;
  path: string;
  urlPath: string;
  siteName: string;
  version: number;
  templateId: string;
  templateName: string;
  allTemplateIds: string[];
  ancestors: string[];
  fields: IndexableFields[];
};

export type IndexableField = {
  name: string;
  type: string;
};

export type IndexableRichTextField = IndexableField & {
  value: string;
};

export type IndexableNumberField = IndexableField & {
  numberValue: number;
};

export type IndexableNameValueListField = IndexableField & {
  values: {
    name: string;
    value: string;
  }[];
};

export type IndexableMultilistField = IndexableField & {
  targetItems: {
    id: string;
    name: string;
    url: string;
    fields: IndexableFields[];
  }[];
};

export type IndexableLookupField = IndexableField & {
  targetItem: {
    id: string;
    name: string;
    fields: IndexableFields[];
  };
};

export type IndexableLinkField = IndexableField & {
  anchor: string;
  className: string;
  linkType: string;
  queryString: string;
  text: string;
  url: string;
};

export type IndexableTextField = IndexableField & {
  value: string;
};

export type IndexableIntegerField = IndexableField & {
  intValue: number;
};

export type IndexableImageField = IndexableField & {
  alt: string;
  height: string;
  width: string;
  src: string;
};

export type IndexableFileField = IndexableField & {
  src: string;
};

export type IndexableDateField = IndexableField & {
  value: string;
};

export type IndexableChecbokField = IndexableField & {
  boolValue: boolean;
};

export type IndexableFields =
  | IndexableRichTextField
  | IndexableNumberField
  | IndexableNameValueListField
  | IndexableMultilistField
  | IndexableLookupField
  | IndexableLinkField
  | IndexableTextField
  | IndexableIntegerField
  | IndexableImageField
  | IndexableFileField
  | IndexableDateField
  | IndexableChecbokField;

export type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export function isChangeFrequency(value: string): boolean {
  const values = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
  return values.indexOf(value) >= 0;
}

export class SitemapItem {
  public readonly metaData: Record<string, any> = {};

  // Sitemap Fields
  public loc = '';
  public lastmod: Date | undefined;
  public priority = 0.5;
  public changefreq: ChangeFrequency = 'daily';

  // Sitecore Fields
  public id = '';
  public name = '';
  public language = '';
  public parentId = '';
  public path = '';
  public url = '';
  public version = 1;
  public templateId = '';
  public templateName = '';
  public allTemplateIds = '';
  public ancestors = '';

  public serialize(node: xml.XMLElement) {
    // Sitemap Fields
    if (this.loc) {
      node.ele('loc').text(this.loc);
    }
    if (this.lastmod) {
      node.ele('lastmod').text(this.lastmod.toISOString());
    }
    node.ele('priority').text(this.priority.toString());
    node.ele('changefreq').text(this.changefreq);

    // Sitecore FIelds
    const coveoMetadata = node.ele('coveo:metadata');
    coveoMetadata
      .ele('uri')
      .text(
        `sitecore://database/edge/ItemId/${this.id}/Language/${this.language}/Version/${this.version}`
      );
    coveoMetadata.ele('sc_id').text(this.id);
    coveoMetadata.ele('sc_name').text(this.name);
    coveoMetadata.ele('sc_language').text(this.language);
    coveoMetadata.ele('sc_parentid').text(this.parentId);
    coveoMetadata.ele('sc_path').text(this.path);
    if (this.url) {
      coveoMetadata.ele('sc_url').text(this.url);
    }
    // TODO: Edge vs Master
    coveoMetadata.ele('sc_uri').text(`sitecore://edge/${this.id}/${this.language}/${this.version}`);
    coveoMetadata.ele('sc_version').text(this.version.toString());
    coveoMetadata.ele('sc_templateid').text(this.templateId);
    coveoMetadata.ele('sc_templatename').text(this.templateName);
    coveoMetadata.ele('sc_alltemplates').text(this.allTemplateIds);
    coveoMetadata.ele('sc_pathids').text(this.ancestors);

    for (const key in this.metaData) {
      coveoMetadata.ele(`ew_${key}`.toLowerCase()).cdata(this.metaData[key] || '');
    }
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    getRichTextField(fieldName: string): IndexableRichTextField | undefined;
    getNumberField(fieldName: string): IndexableNumberField | undefined;
    getNameValueListField(fieldName: string): IndexableNameValueListField | undefined;
    getMultilistField(fieldName: string): IndexableMultilistField | undefined;
    getLookupField(fieldName: string): IndexableLookupField | undefined;
    getLinkField(fieldName: string): IndexableLinkField | undefined;
    getTextField(fieldName: string): IndexableTextField | undefined;
    getIntegerField(fieldName: string): IndexableIntegerField | undefined;
    getImageField(fieldName: string): IndexableImageField | undefined;
    getFileField(fieldName: string): IndexableFileField | undefined;
    getDateField(fieldName: string): IndexableDateField | undefined;
    getCheckboxField(fieldName: string): IndexableChecbokField | undefined;
  }
}

Array.prototype.getRichTextField = function (
  fieldName: string
): IndexableRichTextField | undefined {
  return this.find(
    (field: IndexableField) => field.type == 'RichTextField' && field.name == fieldName
  );
};

Array.prototype.getNumberField = function (fieldName: string): IndexableNumberField | undefined {
  return this.find(
    (field: IndexableField) => field.type == 'NumberField' && field.name == fieldName
  );
};

Array.prototype.getNameValueListField = function (
  fieldName: string
): IndexableNameValueListField | undefined {
  return this.find(
    (field: IndexableField) => field.type == 'NameValueListField' && field.name == fieldName
  );
};

Array.prototype.getMultilistField = function (
  fieldName: string
): IndexableMultilistField | undefined {
  return this.find(
    (field: IndexableField) => field.type == 'MultilistField' && field.name == fieldName
  );
};

Array.prototype.getLookupField = function (fieldName: string): IndexableLookupField | undefined {
  return this.find(
    (field: IndexableField) => field.type == 'LookupField' && field.name == fieldName
  );
};

Array.prototype.getLinkField = function (fieldName: string): IndexableLinkField | undefined {
  return this.find((field: IndexableField) => field.type == 'LinkField' && field.name == fieldName);
};

Array.prototype.getTextField = function (fieldName: string): IndexableTextField | undefined {
  return this.find((field: IndexableField) => field.type == 'TextField' && field.name == fieldName);
};

Array.prototype.getIntegerField = function (fieldName: string): IndexableIntegerField | undefined {
  return this.find(
    (field: IndexableField) => field.type == 'IntegerField' && field.name == fieldName
  );
};

Array.prototype.getImageField = function (fieldName: string): IndexableImageField | undefined {
  return this.find(
    (field: IndexableField) => field.type == 'ImageField' && field.name == fieldName
  );
};

Array.prototype.getFileField = function (fieldName: string): IndexableFileField | undefined {
  return this.find((field: IndexableField) => field.type == 'FileField' && field.name == fieldName);
};

Array.prototype.getDateField = function (fieldName: string): IndexableDateField | undefined {
  return this.find((field: IndexableField) => field.type == 'DateField' && field.name == fieldName);
};

Array.prototype.getCheckboxField = function (fieldName: string): IndexableChecbokField | undefined {
  return this.find(
    (field: IndexableField) => field.type == 'CheckboxField' && field.name == fieldName
  );
};
