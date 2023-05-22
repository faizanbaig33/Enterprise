import { getEnum } from 'lib/utils';
import { PromoSwatchCollectionType, layoutStyle } from './PromoSwatches';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { Headline } from 'src/helpers/Headline';
import ImageWrapper from 'src/helpers/Media/ImageWrapper';
import { BodyCopy } from 'src/helpers/BodyCopy';
import classNames from 'classnames';
import { useTheme } from 'lib/context/ThemeContext';
import { PromoSwatchesTheme } from './PromoSwatches.theme';
import { RichTextWrapper } from 'src/helpers/RichTextWrapper';

const PromoSwatchCollection = (props: PromoSwatchCollectionType & { layoutStyle: layoutStyle }) => {
  const swatchStyle = getEnum(props.fields?.swatchStyle) ?? 'large-circles';
  const { themeData, themeName } = useTheme(PromoSwatchesTheme(props.layoutStyle));

  let swatchImgClasses = '';
  let swatchesGap = '';
  let swatchWidth = '';

  switch (swatchStyle) {
    case 'small-circles':
      swatchImgClasses =
        'h-[64px] ml:h-[86px] w-[64px] ml:w-[86px] rounded-full [&_img]:rounded-full';
      swatchWidth = 'w-[82px] ml:w-[86px] ';
      swatchesGap = classNames(
        'gap-y-m gap-x-[35px] ml:gap-x-[62px] ml:gap-y-l justify-center ml:justify-start',
        themeName === 'rba' ? 'ml:pl-m mt-m ml:mt-l mb-s' : ''
      );
      break;

    case 'large-circles':
      swatchImgClasses = 'h-xxl w-xxl ml:h-[160px] ml:w-[160px] rounded-full [&_img]:rounded-full';
      swatchWidth = 'w-xxl ml:w-[160px]';
      swatchesGap = classNames(
        'gap-x-[52px] gap-y-m ml:gap-x-[38px] justify-center ml:justify-start',
        themeName === 'rba' ? 'my-m' : ''
      );
      break;

    case 'square':
      swatchImgClasses = 'h-[156px] w-[156px] ml:h-[160px] ml:w-[160px]';
      swatchWidth = 'w-[156px] ml:w-[160px]';
      swatchesGap = classNames(
        'gap-x-[15px] ml:gap-x-l gap-y-m',
        themeName === 'rba' ? 'mt-m mb-l' : ''
      );
      break;
  }

  return (
    <div>
      <Headline
        useTag="h3"
        classes={themeData.classes.swatchCollection.swatchTitle}
        fields={{
          headlineText: props.fields?.swatchCollection?.fields.swatchCollectionName ?? {
            value: '',
          },
          superscriptCTA: {
            value: {
              href: '',
            },
          },
        }}
      />

      <BodyCopy
        classes={themeData.classes.swatchCollection.swatchDescription}
        fields={{
          body: props.fields?.swatchCollection?.fields.swatchCollectionDescription ?? { value: '' },
        }}
      />

      <div className={classNames('flex flex-wrap justify-start', swatchesGap)}>
        {props.fields?.swatchCollection?.fields.swatches.map(
          (swatch: Feature.EnterpriseWeb.Elements.Swatches.Swatch, index: number) => {
            return (
              <div key={index} className={classNames(swatchWidth, 'flex flex-col')}>
                <div className={classNames(swatchImgClasses, 'mx-auto mb-xxs')}>
                  <ImageWrapper imageLayout="responsive" image={swatch.fields.swatchImage} />
                </div>
                <Headline
                  useTag="h4"
                  classes={themeData.classes.swatchCollection.swatchLabel}
                  fields={{
                    headlineText: swatch.fields.swatchName ?? {
                      value: '',
                    },
                    superscriptCTA: {
                      value: {
                        href: '',
                      },
                    },
                  }}
                />
              </div>
            );
          }
        )}
      </div>
      <RichTextWrapper
        classes={themeData.classes.swatchCollection.swatchFooterCopy}
        field={props.fields?.swatchCollection?.fields.swatchCollectionFooterCopy ?? { value: '' }}
      />
    </div>
  );
};

export default PromoSwatchCollection;
