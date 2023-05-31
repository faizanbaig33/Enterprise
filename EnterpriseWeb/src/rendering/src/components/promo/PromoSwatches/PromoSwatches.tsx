// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { Component } from 'src/helpers/Component';
import { PromoSwatchesTheme } from './PromoSwatches.theme';
import { getEnum } from 'lib/utils';
import { Eyebrow } from 'src/helpers/Eyebrow';
import { Headline } from 'src/helpers/Headline';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { MediaPrimary } from 'src/helpers/Media';
import PromoSwatchCollection from './PromoSwatchCollection';
import { EnumField } from 'lib/utils/get-enum';
import classNames from 'classnames';

export type layoutStyle = 'full-width' | 'side-by-side';
export type swatchStyle = 'small-circles' | 'large-circles' | 'square';

export type PromoSwatchCollectionType =
  Feature.EnterpriseWeb.Components.Promo.PromoSwatches.PromoSwatchCollection & {
    fields?: {
      swatchCollection?: Feature.EnterpriseWeb.Elements.Swatches.SwatchCollection & {
        fields?: {
          swatches: Feature.EnterpriseWeb.Elements.Swatches.Swatch[];
        };
      };
      swatchStyle?: EnumField<swatchStyle>;
    };
  };

export type PromoSwatchesProps =
  Feature.EnterpriseWeb.Components.Promo.PromoSwatches.PromoSwatches & {
    fields?: {
      children: PromoSwatchCollectionType[];
    };
  };

const PromoSwatches = (props: PromoSwatchesProps) => {
  const layoutStyle = getEnum<layoutStyle>(props.fields?.layoutStyle) || 'side-by-side';
  const { themeData, themeName } = useTheme(PromoSwatchesTheme(layoutStyle));

  let promoContentColumn;
  let promoImageColumn;

  switch (layoutStyle) {
    case 'side-by-side':
      promoContentColumn = 'col-span-12 ml:col-span-6 order-last ml:order-first';
      promoImageColumn = 'col-span-12 ml:col-span-6';
      break;

    case 'full-width':
      promoContentColumn = 'col-span-12 order-last';
      promoImageColumn = 'col-span-12';
      break;
  }

  return (
    <Component
      variant="lg"
      gap={classNames(
        themeName === 'aw' ? 'gap-y-s ml:gap-y-m gap-x-s' : 'gap-y-m ml:gap-y-ml gap-x-s'
      )}
      dataComponent="promo/promoswatches"
      {...props}
    >
      <div className={promoContentColumn}>
        <Eyebrow {...props} classes={themeData.classes.eyebrow} />
        <Headline {...props} classes={themeData.classes.headline} />
        <BodyCopy {...props} classes={themeData.classes.bodycopy} />
        {props.fields?.children.map(
          (swatchCollection: PromoSwatchCollectionType, index: number) => {
            return (
              <PromoSwatchCollection
                {...swatchCollection}
                layoutStyle={layoutStyle}
                key={'swatchcollection-' + index}
              />
            );
          }
        )}
      </div>
      <div className={promoImageColumn}>
        <MediaPrimary {...props} />
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<PromoSwatchesProps>(PromoSwatches);
