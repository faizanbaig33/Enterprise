import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { useTheme } from 'lib/context/ThemeContext';
import { getEnum } from 'lib/utils';
import { Eyebrow } from 'src/helpers/Eyebrow';
import { Headline } from 'src/helpers/Headline';
import { ImagePrimary } from 'src/helpers/Media';
import SingleButton from 'src/helpers/SingleButton/SingleButton';
import { ResultItem } from './ImagesForAll';
import { MashupStyle, PageMashupProps } from './PageMashup';
import { PageMashupTheme } from './PageMashup.theme';
import { RichTextWrapper } from 'src/helpers/RichTextWrapper';

type FeaturedImageOnlyProps = PageMashupProps & {
  fields: {
    resultItems: Array<ResultItem>;
  };
} & { mashupStyle: MashupStyle };
const FeaturedImageOnly = (props: FeaturedImageOnlyProps) => {
  const { themeData } = useTheme(PageMashupTheme);
  const ARTICLE_TEMPLATE_ID = '9256edf3-d0fa-4588-adda-3036b9d04faa';
  const fallBackImage = props.fields.fallbackImage;
  const featuredArticleDesktopImage = props.fields.resultItems[0].fields.articleImage.value?.src
    ? props.fields.resultItems[0].fields.articleImage
    : fallBackImage;

  const featuredPrimaryImage = props.fields.resultItems[0].fields.primaryImage.value?.src
    ? props.fields.resultItems[0].fields.primaryImage
    : fallBackImage;

  const featuredArticleMobileImage = props.fields.resultItems[0].fields.articleThumbnail?.value?.src
    ? props.fields.resultItems[0].fields.articleThumbnail
    : featuredArticleDesktopImage;

  const featuredPrimaryImageMobile = props.fields.resultItems[0].fields.primaryImageMobile?.value
    ?.src
    ? props.fields.resultItems[0].fields.primaryImageMobile
    : featuredPrimaryImage;

  return (
    <>
      <div
        className={classNames(
          props.mashupStyle != 'feature-image-only'
            ? themeData.classes.featuredCard.wrapper.noImages
            : themeData.classes.featuredCard.wrapper.featuredImage
        )}
      >
        {props.mashupStyle === 'feature-image-only' && (
          <ImagePrimary
            imageLayout={'intrinsic'}
            ratio="picture"
            fields={{
              primaryImageCaption: {
                value: '',
              },
              primaryImage:
                props.fields?.resultItems?.[0].templateId === ARTICLE_TEMPLATE_ID
                  ? featuredArticleDesktopImage
                  : featuredPrimaryImage,
              primaryImageMobile:
                props.fields?.resultItems?.[0].templateId === ARTICLE_TEMPLATE_ID
                  ? featuredArticleMobileImage
                  : featuredPrimaryImageMobile,
              primaryImageMobileFocusArea:
                props.fields?.resultItems?.[0].templateId === ARTICLE_TEMPLATE_ID
                  ? {
                      id: 'e6b36945-ebc0-4af8-ad95-d8268b56b7d0',
                      url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Image-Focus/Center',
                      name: 'Center',
                      displayName: 'Center',
                      fields: {
                        Value: {
                          value: 'center',
                        },
                      },
                      templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                      templateName: 'Enum',
                    }
                  : props.fields.resultItems[0].fields.primaryImageMobileFocusArea,
            }}
          />
        )}

        {props.fields?.displayEyebrow.value && (
          <Eyebrow
            useTag="span"
            fields={{
              eyebrowText: {
                value:
                  props.fields?.resultItems?.[0].templateId === ARTICLE_TEMPLATE_ID
                    ? getEnum<string>(props.fields?.resultItems?.[0].fields?.articleTopic) || ''
                    : props.fields?.resultItems?.[0].fields.eyebrow.value,
              },
            }}
            classes={classNames(
              props.mashupStyle === 'feature-image-only'
                ? themeData.classes.featuredCard.eyebrow.featuredImage
                : themeData.classes.featuredCard.eyebrow.noImages,
              'mt-s'
            )}
          />
        )}
        <Headline
          classes={classNames(
            props.mashupStyle === 'feature-image-only'
              ? themeData.classes.featuredCard.headline.featuredImage
              : themeData.classes.featuredCard.headline.noImages
          )}
          useTag="h3"
          fields={{
            headlineText: { value: props.fields?.resultItems?.[0].fields?.openGraphTitle?.value },
            superscriptCTA: {
              value: {
                href: '',
              },
            },
          }}
        />

        <RichTextWrapper
          classes={themeData.classes.featuredCard.body.featuredImage}
          field={{
            value: props.fields?.resultItems?.[0].fields.openGraphDescription.value,
          }}
        />

        <SingleButton
          classes={{ wrapper: 'mb-0 md:mb-s', cta1Classes: 'font-bold' }}
          fields={{
            cta1Link: {
              value: {
                href: props.fields?.resultItems?.[0].url,
                text: 'Read More',
                anchor: '',
                linktype: 'internal',
                class: '',
                title: '',
                target: '',
                querystring: '',
                id: '{7FB335D2-8E99-458E-9EF9-562A78CCB821}',
              },
            },
            cta1ModalLinkText: {
              value: '',
            },
            cta1Style: {
              id: '49a23327-0397-4cce-a930-e76918d37c42',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Primary',
              name: 'Primary',
              displayName: 'Primary',
              fields: {
                Value: {
                  value: 'link',
                },
              },
              templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
              templateName: 'Enum',
            },
            cta1Icon: {
              id: '50590edc-7ea7-4436-9a3e-701c87a07db2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Arrow',
              name: 'Arrow',
              displayName: 'Arrow',
              fields: {
                Value: {
                  value: 'arrow',
                },
              },
              templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
              templateName: 'Enum',
            },
          }}
        />
      </div>

      <div className="md:gap-lg col-span-12  grid grid-cols-12 gap-x-s gap-y-ml self-start border-t border-gray pt-s md:col-span-6">
        {props.fields?.resultItems.slice(1)?.map((resultItem: ResultItem, index: number) => {
          return (
            <div key={index} className=" col-span-12  border-b border-gray ">
              {props.fields?.displayEyebrow.value && (
                <Eyebrow
                  useTag="span"
                  fields={{
                    eyebrowText: {
                      value:
                        resultItem?.templateId === ARTICLE_TEMPLATE_ID
                          ? getEnum<string>(resultItem.fields.articleTopic) || ''
                          : (resultItem?.fields.eyebrow as Field<string>).value,
                    },
                  }}
                  classes={themeData.classes.generalCard.eyebrow}
                />
              )}
              <Headline
                classes={themeData.classes.generalCard.headline}
                useTag="h3"
                fields={{
                  headlineText: {
                    value: (resultItem?.fields?.openGraphTitle as Field<string>)?.value,
                  },
                  superscriptCTA: {
                    value: {
                      href: '',
                    },
                  },
                }}
              />

              <RichTextWrapper
                classes={themeData.classes.generalCard.body}
                field={{
                  value: (resultItem?.fields.openGraphDescription as Field<string>).value,
                }}
              />
              <SingleButton
                classes={themeData.classes.generalCard.singleButton}
                fields={{
                  cta1Link: {
                    value: {
                      href: resultItem?.url,
                      text: 'Read More',
                      anchor: '',
                      linktype: 'internal',
                      class: '',
                      title: '',
                      target: '',
                      querystring: '',
                      id: '{7FB335D2-8E99-458E-9EF9-562A78CCB821}',
                    },
                  },
                  cta1ModalLinkText: {
                    value: '',
                  },
                  cta1Style: {
                    id: '49a23327-0397-4cce-a930-e76918d37c42',
                    url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Primary',
                    name: 'Primary',
                    displayName: 'Primary',
                    fields: {
                      Value: {
                        value: 'link',
                      },
                    },
                    templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                    templateName: 'Enum',
                  },
                  cta1Icon: {
                    id: '50590edc-7ea7-4436-9a3e-701c87a07db2',
                    url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Arrow',
                    name: 'Arrow',
                    displayName: 'Arrow',
                    fields: {
                      Value: {
                        value: 'arrow',
                      },
                    },
                    templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                    templateName: 'Enum',
                  },
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FeaturedImageOnly;
