// Components
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { Component } from 'src/helpers/Component';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { getEnum } from 'lib/utils';
import { Headline } from 'src/helpers/Headline';
import { ImagePrimary } from 'src/helpers/Media';
import { ComponentProps } from 'lib/component-props';
import { SliderWrapper } from 'src/helpers/SliderWrapper';
import { useTheme } from 'lib/context/ThemeContext';
import { getBreakpoint, useCurrentScreenType } from 'lib/utils/get-screen-type';
import CalloutItem from './CalloutItem';
import { ListImageWithCalloutsTheme } from './ListImageWithCallouts.theme';

type CalloutItemProp =
  Feature.EnterpriseWeb.Components.Listing.ListImageWithCallouts.ListImageWithCalloutsItem;

export type ListImageWithCalloutsProps = {
  fields: Feature.EnterpriseWeb.Components.Listing.ListImageWithCallouts.ListImageWithCallouts['fields'] & {
    children: Array<CalloutItemProp>;
  };
} & ComponentProps;

const RowPositions: { [callOutIndex: number]: string } = {
  1: 'md:row-start-1',
  2: 'md:row-start-2',
  3: 'md:row-start-3',
};

const ColPositions: { [callOutIndex: number]: string } = {
  1: 'md:col-start-1',
  3: 'md:col-start-10',
};

const ListImageWithCallouts = (props: ListImageWithCalloutsProps): JSX.Element => {
  const { fields } = props;
  const { themeName, themeData } = useTheme(ListImageWithCalloutsTheme);
  const imagePosition = getEnum(fields.imgPosition) || 'right';

  const { currentScreenWidth } = useCurrentScreenType();

  // We've to use this check in order remove optional chaining
  if (!fields) {
    return <></>;
  }

  // Callout items code
  const calloutItems = fields.children;

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    enableNumberedPagination: themeName === 'rba',
  };

  const renderCallouts = () => {
    if (currentScreenWidth <= getBreakpoint('md')) {
      // Renderings for mobile devices
      return (
        <div
          className={classNames(
            'col-span-12',
            calloutItems.length > 3 ? 'md:col-span-3' : 'md:col-span-5'
          )}
        >
          <SliderWrapper sliderSettings={sliderSettings} theme={themeName}>
            {calloutItems.map((item: CalloutItemProp, index: number) => {
              return (
                <CalloutItem
                  key={index}
                  fields={item.fields}
                  callOutItemClasses={themeData.classes.callOutItemClasses}
                />
              );
            })}
          </SliderWrapper>
        </div>
      );
    } else {
      // Renderings for tablets and large screen devices
      return calloutItems.map((item: { fields: any }, index: number) => {
        return (
          <div
            key={index}
            className={classNames(
              calloutItems.length > 3 ? 'md:col-span-3' : 'md:col-span-5',
              RowPositions[(index % 3) + 2],
              calloutItems.length > 3
                ? ColPositions[index > 2 ? 3 : 1]
                : imagePosition === 'right'
                ? 'md:col-start-1'
                : 'md:col-start-7'
            )}
          >
            <CalloutItem
              fields={item.fields}
              callOutItemClasses={themeData.classes.callOutItemClasses}
            />
          </div>
        );
      });
    }
  };

  return (
    <Component
      variant={themeName === 'aw' ? 'full' : 'lg'}
      backgroundVariant={getEnum(fields.backgroundColor)}
      dataComponent="listing/listimagewithcallouts"
      {...props}
    >
      <div className={classNames('col-span-12', themeData.classes.listWrapper)}>
        <div
          className={classNames(
            'grid-rows-auto grid grid-cols-12 gap-y-0 md:max-w-screen-lg md:grid-flow-row-dense md:grid-cols-12 md:gap-s lg:mx-auto'
          )}
        >
          <div className="col-span-12">
            <Headline classes={themeData.classes.headline} {...props} />
          </div>
          <div
            className={classNames(
              'col-span-12 row-span-3 md:col-span-6 md:row-start-2',
              calloutItems.length > 3
                ? 'md:col-start-4'
                : imagePosition === 'right'
                ? 'md:col-start-7'
                : 'md:col-start-1',
              themeData.classes.imageContainer
            )}
          >
            <ImagePrimary imageLayout={'intrinsic'} ratio="portrait" focusArea={'top'} {...props} />
          </div>
          {renderCallouts()}
        </div>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<ListImageWithCalloutsProps>(ListImageWithCallouts);
