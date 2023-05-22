import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { Headline } from 'src/helpers/Headline';
import { Component } from 'src/helpers/Component';
import { useTheme } from 'lib/context/ThemeContext';
import { ListHighlightAndCtaTheme } from './ListHighlightAndCta.theme';
import { BodyCopy } from 'src/helpers/BodyCopy';
import OrangeTriangle from '../../../helpers/SvgIcon/icons/icon--orange-triangle';
import SingleButton from 'src/helpers/SingleButton/SingleButton';
import { ButtonVariants } from 'src/helpers/Button';
import { getEnum } from 'lib/utils';
import { ButtonGroup } from 'src/helpers/ButtonGroup';

export type ListHighlightAndCtaProps =
  Feature.EnterpriseWeb.Components.Listing.ListHighlightAndCta.ListHighlightAndCta;
export type ListHighlightAndCtaItemProps =
  Feature.EnterpriseWeb.Components.Listing.ListHighlightAndCta.ListHighlightAndCtaItem;

const ListHighlightAndCta = (props: ListHighlightAndCtaProps): JSX.Element => {
  const { themeData, themeName } = useTheme(ListHighlightAndCtaTheme());
  const sectionHeadline: any = {
    headlineText: props.fields?.sectionHeadline,
    headlineLevel: props.fields?.sectionHeadlineLevel,
  };

  return (
    <Component variant="lg" dataComponent="listing/listhighlightandcta" {...props}>
      <div className={themeData.classes.headlineBorder}>
        <div className="mt-4 flex md:mt-2">
          {themeName === 'aw' && (
            <div className="m-1 mt-[1px] flex">
              <OrangeTriangle></OrangeTriangle>
            </div>
          )}
          <Headline classes={themeData.classes.headlineClass} fields={sectionHeadline} />
        </div>
      </div>

      {/* loop through children */}
      <div className="col-span-12 md:col-span-8">
        {props.fields?.children?.map((_item: ListHighlightAndCtaItemProps, i: number) => {
          const buttonStyle = getEnum<ButtonVariants>(_item.fields?.cta1Style);
          if (_item.fields && buttonStyle === 'link-right-icon') {
            _item.fields.cta1Link.value.text =
              _item.fields.headlineText.value !== ''
                ? _item.fields.headlineText.value
                : _item.fields.cta1Link.value.text;
          }

          return (
            <div key={i} className={themeData.classes.listItemContainer}>
              <div className={themeData.classes.listItemHeadlineBorder}>
                <div>
                  {buttonStyle !== 'link-right-icon' && (
                    <>
                      <Headline
                        classes={themeData.classes.contentClasses.listItemHeadlineClass}
                        fields={_item.fields}
                      />
                      <BodyCopy
                        fields={_item.fields}
                        classes={themeData.classes.contentClasses.body}
                      />
                    </>
                  )}

                  {buttonStyle === 'link-right-icon' ? (
                    <SingleButton
                      classes={themeData.classes.buttonGroupClassRightIcon}
                      fields={_item.fields}
                    />
                  ) : (
                    <ButtonGroup
                      classes={themeData.classes.buttonGroupClass}
                      fields={_item.fields}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<ListHighlightAndCtaProps>(ListHighlightAndCta);
