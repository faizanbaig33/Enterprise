// Components
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { useTheme } from 'lib/context/ThemeContext';
import { getEnum } from 'lib/utils';
import { getBreakpoint, useCurrentScreenType } from 'lib/utils/get-screen-type';
import { ReactElement } from 'react';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { Component } from 'src/helpers/Component';
import { GridDisplay, SliderDisplay } from './DisplayModes';
import { XupCardCollectionTheme } from './XupCardCollection.theme';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { ButtonGroup } from 'src/helpers/ButtonGroup';
import { Headline } from 'src/helpers/Headline';
import { DefaultEditFrameButton, EditFrame } from 'src/helpers/EditFrame';

export type XupCardCollectionProps =
  Feature.EnterpriseWeb.Components.Listing.XupCardCollection.XupCardContainer;

export type XupDisplayStyle = 'grid' | 'horizontal-scroll';

const XupCardCollection = (props: XupCardCollectionProps): JSX.Element => {
  const { currentScreenWidth } = useCurrentScreenType();
  const { themeData } = useTheme(XupCardCollectionTheme);

  const desktopDisplayStyle = getEnum<XupDisplayStyle>(props.fields.desktopDisplayStyle) || 'grid';
  const mobileDisplayStyle = getEnum<XupDisplayStyle>(props.fields.mobileDisplayStyle) || 'grid';

  const maxCardsPerRow: number = parseInt(getEnum<string>(props.fields.cardsPerRow) || '3');

  const sliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: maxCardsPerRow,
    responsive: [
      {
        breakpoint: getBreakpoint('md'),
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  };

  const renderCardColection = (): ReactElement => {
    if (currentScreenWidth < getBreakpoint('md')) {
      // Renderings for mobile devices
      if (mobileDisplayStyle === 'grid') {
        return (
          <GridDisplay rendering={props.rendering} favoriteProducts={props.favoriteProducts} />
        );
      } else {
        return (
          <SliderDisplay
            rendering={props.rendering}
            sliderSettings={sliderSettings}
            favoriteProducts={props.favoriteProducts}
          />
        );
      }
    } else {
      // Renderings for tablets and large screen devices
      if (desktopDisplayStyle === 'grid') {
        return (
          <GridDisplay
            rendering={props.rendering}
            maxCardsPerRow={maxCardsPerRow}
            favoriteProducts={props.favoriteProducts}
          />
        );
      } else {
        return (
          <SliderDisplay
            rendering={props.rendering}
            sliderSettings={sliderSettings}
            favoriteProducts={props.favoriteProducts}
          />
        );
      }
    }
  };

  return (
    <EditFrame
      title="Xup Card Collection Cards"
      dataSource={{ itemId: props.rendering.dataSource }}
      buttons={[{ ...DefaultEditFrameButton.edit, fields: ['ph-cards'] }]}
    >
      <Component variant="lg" dataComponent="listing/xupcardcollection" {...props}>
        <div className={classNames('col-span-10')}>
          <Headline classes={themeData.classes.headlineClass} {...props} />
          <BodyCopy classes={themeData.classes.bodyClass} {...props} />
          <ButtonGroup classes={themeData.classes.buttonGroupClass} {...props} />
        </div>
        {renderCardColection()}
      </Component>
    </EditFrame>
  );
};

export default withDatasourceCheck()<XupCardCollectionProps>(XupCardCollection);
