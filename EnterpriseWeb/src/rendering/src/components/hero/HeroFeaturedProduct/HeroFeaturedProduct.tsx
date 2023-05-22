// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import classNames from 'classnames';
import { Component } from 'src/helpers/Component';
import { Subheadline } from 'src/helpers/Subheadline';
import { Headline } from 'src/helpers/Headline';
import { ImagePrimary } from 'src/helpers/Media';
import { RichTextWrapper } from 'src/helpers/RichTextWrapper';
import { HeroFeaturedProductTheme } from './HeroFeaturedProduct.theme';

export type HeroFeaturedProductProps = Feature.EnterpriseWeb.Components.Hero.HeroFeaturedProduct;
const HeroFeaturedProduct = (props: HeroFeaturedProductProps) => {
  const { fields } = props;

  const { themeName, themeData } = useTheme(HeroFeaturedProductTheme);
  const subheadingList: Array<Field<string>> = [];

  if (!fields) return null;

  Object.keys(fields).map((key, index) => {
    if (key === `subheading${index + 1}`) {
      (fields as any)[key].value && subheadingList.push((fields as any)[key]);
    }
  });

  return (
    <>
      <Component
        variant="lg"
        fluidBackground={themeName === 'rba' && 'bg-light-gray'}
        dataComponent="hero/herofeaturedproduct"
        {...props}
      >
        <div className={classNames('col-span-12', themeData.classes.productWrapper)}>
          <div className={themeData.classes.headingsWrapper}>
            <Subheadline classes={themeData.classes.smallHeadline} useTag="h2" {...props} />
            <Headline classes={themeData.classes.largeHeadline} useTag="h1" {...props} />
          </div>
          <div className={themeData.classes.imageWrapper}>
            <ImagePrimary
              maxH={'max-w-[592px]'}
              additionalDesktopClasses={themeData.classes.additionalDesktopClasses}
              additionalMobileClasses={themeData.classes.additionalDesktopClasses}
              {...props}
            />
          </div>
        </div>
      </Component>
      <Component variant="lg" {...props}>
        <div className={`col-span-12 ${themeData.classes.subheadingsList}`}>
          {subheadingList.map((item, index: number) => {
            return (
              <div key={index} className={classNames(themeData.classes.subheadingItem)}>
                <RichTextWrapper field={item} classes={themeData.classes.rteClasses} />
              </div>
            );
          })}
        </div>
      </Component>
    </>
  );
};

export default withDatasourceCheck()<HeroFeaturedProductProps>(HeroFeaturedProduct);
