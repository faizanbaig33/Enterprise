// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const ArticleTagsTheme: ThemeFile = {
  aw: {
    classes: {
      tagsWrapper: 'inline-flex gap-4 col-span-12',
      tag: 'bg-black text-white text-body font-regular py-1 px-2',
    },
  },
  rba: {
    classes: {
      tagsWrapper: 'inline-flex gap-3 col-span-12',
      tag: 'border border-gray text-body font-regular p-1',
    },
  },
};
