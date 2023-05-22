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

type XupDisplayStyle = 'grid' | 'horizontal-scroll';

const ColumnSpans: { [cardsInRow: number]: string } = {
  1: 'md:col-span-12',
  2: 'md:col-span-6',
  3: 'md:col-span-4',
  4: 'md:col-span-3',
};

const XupCardCollection = (props: XupCardCollectionProps): JSX.Element => {
  const { currentScreenWidth } = useCurrentScreenType();
  const { themeData } = useTheme(XupCardCollectionTheme);

  const desktopDisplayStyle = getEnum<XupDisplayStyle>(props.fields.desktopDisplayStyle) || 'grid';
  const mobileDisplayStyle = getEnum<XupDisplayStyle>(props.fields.mobileDisplayStyle) || 'grid';

  const maxCardsPerRow: number = parseInt(getEnum<string>(props.fields.cardsPerRow) || '3');

  let currentRow = 1; // currentRow will be used for grid display for dynamic column span calculation

  const getLayoutClasses = (totalCards: number, currentIndex: number): string => {
    const totalRows = Math.ceil(totalCards / maxCardsPerRow);

    //If total cards are less than max cards per row
    if (totalCards <= maxCardsPerRow) return ColumnSpans[totalCards];
    //If all rows have equal cards
    else if (totalCards % maxCardsPerRow === 0) return ColumnSpans[maxCardsPerRow];
    else {
      // If row is filled with max cards than increase current row
      if (currentIndex > 0 && currentIndex % maxCardsPerRow === 0) currentRow++;

      // If current row is last row
      if (currentRow === totalRows) {
        const startCol = (12 / maxCardsPerRow) * (currentIndex % maxCardsPerRow) + 1;
        return `${ColumnSpans[maxCardsPerRow]} md:col-start-${startCol}`;
      } else {
        return ColumnSpans[maxCardsPerRow];
      }
    }
  };

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
            getLayoutClasses={getLayoutClasses}
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
