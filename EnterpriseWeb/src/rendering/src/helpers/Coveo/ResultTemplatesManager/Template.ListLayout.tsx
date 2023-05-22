import { Result } from '@coveo/headless';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { ResultLink } from 'src/helpers/Coveo/ResultList/ResultLink';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { getEnum } from 'lib/utils';
import { getFieldsToInclude, getResultItemIndex } from './TemplateUtils';

export const getListLayout = (
  resultItems: Feature.EnterpriseWeb.Elements.Search.ListResultItem[],
  resultListClasses: { [property: string]: string }
) => {
  const fieldsToInclude = getFieldsToInclude(resultItems, 'list');

  return {
    priority: 1,
    conditions: [],
    fields: ['sc_templateid', ...fieldsToInclude],
    content: (result: Result) => {
      const resultItemIndex = getResultItemIndex(resultItems, result.raw.sc_templateid as string);

      const resultItemToConsider = resultItems[resultItemIndex];

      const renderingFields = {
        eyebrow: result.raw[getEnum<string>(resultItemToConsider.fields?.eyebrowField) || ''],
        headline: result.raw[getEnum<string>(resultItemToConsider.fields?.headingField) || ''],
        description:
          result.raw[getEnum<string>(resultItemToConsider.fields?.descriptionField) || ''],
        image: result.raw[getEnum<string>(resultItemToConsider.fields?.imageField) || ''],
        icon: resultItemToConsider.fields?.icon.value?.src || '',
      };

      return (
        <li
          key={result.uniqueId}
          className={twMerge(
            resultListClasses.resultItem,
            result.rankingModifier === 'FeaturedResult' && resultListClasses.featuredResultItem
          )}
          onClick={(e) => {
            if (result.rankingModifier === 'FeaturedResult') {
              // Get link element from featured result item
              e.currentTarget.getElementsByTagName('a')[0].click();
            }
          }}
        >
          <article className="flex items-center justify-between">
            <div className="flex-1">
              {renderingFields.eyebrow && (
                <p className={resultListClasses.resultEyebrow}>{`${renderingFields.eyebrow}`}</p>
              )}
              {renderingFields.headline && (
                <h2
                  className={`line-clamp-2 md:line-clamp-none ${resultListClasses.resultHeading}`}
                >
                  <ResultLink result={result}>{`${renderingFields.headline}`}</ResultLink>
                </h2>
              )}
              {renderingFields.description && (
                <p
                  className={`line-clamp-2 md:line-clamp-3 ${resultListClasses.resultDescription}`}
                >
                  {`${renderingFields.description}`}
                </p>
              )}
            </div>
            {((renderingFields.image && renderingFields.image !== 'null') ||
              renderingFields.icon) && (
              <div
                className={twMerge(
                  'relative -z-10',
                  renderingFields.image
                    ? 'h-[96px] w-[96px] md:h-[140px] md:w-[140px]'
                    : 'h-[50px] w-[50px]'
                )}
              >
                <Image
                  src={`${renderingFields.image || renderingFields.icon}`}
                  layout="fill"
                  objectFit="cover"
                  alt={`${renderingFields.headline}`}
                />
              </div>
            )}
          </article>
        </li>
      );
    },
  };
};
