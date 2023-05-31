import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { useTheme } from 'lib/context/ThemeContext';
import SingleButton from 'src/helpers/SingleButton/SingleButton';
import { ImagePrimary } from 'src/helpers/Media';
import { RichTextWrapper } from 'src/helpers/RichTextWrapper';
import { FavoriteProductsTheme } from './FavoriteProducts.theme';
import { ReactElement } from 'react';

export type FavoriteProductsProps =
  Feature.EnterpriseWeb.Components.Listing.Favorites.FavoriteProducts;

export const NoResults = ({ fields }: FavoriteProductsProps): ReactElement => {
  const { themeData } = useTheme(FavoriteProductsTheme);
  return (
    <>
      <div>
        <div>
          <Text
            classes={themeData.classes.noResultsHeadline}
            field={{ value: fields.noResultsHeadline.value }}
          />
          <RichTextWrapper
            field={{ value: fields.noResultsBodyCopy.value }}
            className="mt-[20px]"
          />
        </div>
        <div className="mt-m grid grid-cols-1 gap-4 ml:grid-cols-2">
          <div>
            <ImagePrimary
              fields={{
                primaryImageCaption: {
                  value: '',
                },
                primaryImage: { value: fields.primaryImage.value },
                primaryImageMobile: { value: fields.primaryImageMobile.value },
              }}
            />
            <div className="mt-s">
              <Text
                classes={themeData.classes.cardHeadline}
                field={{ value: fields.card1Headline.value }}
              />
            </div>
            <div>
              <Text
                classes={themeData.classes.cardSubheadline}
                field={{ value: fields.card1Subheadline.value }}
              />
            </div>
            <SingleButton fields={fields} classes={{ wrapper: 'mt-m' }} />
          </div>

          <div>
            <ImagePrimary
              fields={{
                primaryImageCaption: {
                  value: '',
                },
                primaryImage: { value: fields.secondaryImage.value },
                primaryImageMobile: { value: fields.secondaryImageMobile.value },
              }}
            />
            <div className="mt-s">
              <Text
                classes={themeData.classes.cardHeadline}
                field={{ value: fields.card2Headline.value }}
              />
            </div>
            <div>
              <Text
                classes={themeData.classes.cardSubheadline}
                field={{ value: fields.card2Subheadline.value }}
              />
            </div>
            <SingleButton
              classes={{ wrapper: 'mt-m' }}
              fields={{
                cta1Link: {
                  value: {
                    href: fields.cta2Link.value.href,
                    text: fields.cta2Link.value.text,
                    anchor: fields.cta2Link.value.anchor,
                    linktype: fields.cta2Link.value.linktype,
                    class: fields.cta2Link.value.class,
                    title: fields.cta2Link.value.title,
                    target: fields.cta2Link.value.target,
                    querystring: fields.cta2Link.value.querystring,
                    id: fields.cta2Link.value.id,
                  },
                },
                cta1ModalLinkText: {
                  value: '',
                },
                cta1Style: {
                  id: fields.cta2Style.id,
                  url: fields.cta2Style.url,
                  name: fields.cta2Style.name,
                  displayName: fields.cta2Style.displayName,
                  fields: {
                    Value: {
                      value: fields.cta2Style.fields.Value.value,
                    },
                  },
                  templateId: fields.cta2Style.templateId,
                  templateName: fields.cta2Style.templateName,
                },
                cta1Icon: {
                  id: fields.cta2Icon.templateId,
                  url: fields.cta2Icon.url,
                  name: fields.cta2Icon.name,
                  displayName: fields.cta2Icon.displayName,
                  fields: {
                    Value: {
                      value: fields.cta2Icon.fields.Value.value,
                    },
                  },
                  templateId: fields.cta2Icon.templateId,
                  templateName: fields.cta2Icon.templateName,
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
