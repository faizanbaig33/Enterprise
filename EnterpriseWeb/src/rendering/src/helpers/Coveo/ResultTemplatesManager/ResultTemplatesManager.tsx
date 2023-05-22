import { ResultTemplatesManager, Result } from '@coveo/headless';
import { getTableLayout } from './Template.TableLayout';
import { getGridLayout } from './Template.GridLayout';
import { getListLayout } from './Template.ListLayout';
import { SearchProps } from 'components/search/Search/Search';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

export type LayoutType = 'list' | 'table' | 'grid';

export type GridStyle = 'photo-gallery' | 'result-with-image' | 'result-without-image';

export const registerTemplates = (
  resultTemplatesManager: ResultTemplatesManager<(result: Result) => JSX.Element>,
  layoutClasses: { [property: string]: string },
  data: SearchProps,
  resultLayout: LayoutType,
  gridStyle?: GridStyle
) => {
  resultTemplatesManager.registerTemplates(
    (() => {
      switch (resultLayout) {
        case 'list': {
          return getListLayout(
            data.fields
              .listResultItems as unknown as Feature.EnterpriseWeb.Elements.Search.ListResultItem[],
            layoutClasses
          );
        }
        case 'table': {
          return getTableLayout(data.fields.columns, layoutClasses);
        }
        case 'grid': {
          return getGridLayout(
            data.fields
              .gridResultItems as unknown as Feature.EnterpriseWeb.Elements.Search.GridResultItem[],
            layoutClasses,
            gridStyle || 'photo-gallery'
          );
        }
        default: {
          return getListLayout(
            data.fields
              .listResultItems as unknown as Feature.EnterpriseWeb.Elements.Search.ListResultItem[],
            layoutClasses
          );
        }
      }
    })()
  );
};
