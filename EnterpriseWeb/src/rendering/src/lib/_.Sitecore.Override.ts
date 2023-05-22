/**
 * This file is actually not auto-generated, but is used to override Sitecore base interfaces
 */

import { Field, Item } from '@sitecore-jss/sitecore-jss-nextjs';

export type ItemExt = Item & {
  id: string;
  url: string;
  templateId?: string;
  templateName?: string;
  fields?: {
    [name: string]: Field | Item | Item[] | ItemExt | ItemExt[] | undefined;
  };
};
