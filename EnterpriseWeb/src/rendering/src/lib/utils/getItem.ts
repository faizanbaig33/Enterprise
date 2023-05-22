import { Item } from '@sitecore-jss/sitecore-jss-nextjs';
import { ItemExt } from 'lib/_.Sitecore.Override';
import { getEnum } from './get-enum';

export const getItem = (item?: ItemExt): Item => {
  const noitem = {} as unknown as Item;

  return getEnum<Item>(item) || noitem;
};
