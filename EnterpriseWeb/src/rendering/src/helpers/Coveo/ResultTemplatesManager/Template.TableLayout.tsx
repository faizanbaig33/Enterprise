import { Result } from '@coveo/headless';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { getFieldsToInclude } from './TemplateUtils';
import classNames from 'classnames';
import { getEnum } from 'lib/utils';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { ResultLink } from '../ResultList/ResultLink';

export const getTableLayout = (
  resultItems: Feature.EnterpriseWeb.Elements.Search.ResultColumn[],
  documentListClasses: { [property: string]: string }
) => {
  const fieldsToInclude = getFieldsToInclude(resultItems, 'table');

  return {
    priority: 1,
    conditions: [],
    fields: ['sc_templateid', ...fieldsToInclude],
    content: (result: Result) => {
      return (
        <li
          key={result.uniqueId}
          className="flex flex-col border-b border-gray py-s text-body text-dark-gray ml:flex-row"
        >
          {resultItems.map((item, index) => {
            return (
              <div
                key={index}
                className={classNames('my-xxs flex', index === 0 ? 'basis-4/5' : 'basis-1/5')}
              >
                <p className={classNames('basis-2/6 ml:hidden', documentListClasses.itemTitle)}>
                  {item.fields?.displayName.value}
                </p>
                {item.fields?.isResultLink.value ? (
                  <div className={documentListClasses.itemLink}>
                    <SvgIcon icon="pdf" className="mr-xxs" />
                    <ResultLink result={result}>{item.fields?.text.value}</ResultLink>
                  </div>
                ) : (
                  <p className="basis-4/6">
                    {
                      result.raw[
                        getEnum<string>(item.fields?.field) || item.fields?.text.value || ''
                      ] as string
                    }
                  </p>
                )}
              </div>
            );
          })}
        </li>
      );
    },
  };
};
