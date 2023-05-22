// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { Component } from 'src/helpers/Component';
import { PageMashupTheme } from './PageMashup.theme';
import { Headline } from 'src/helpers/Headline';
import { BodyCopy } from 'src/helpers/BodyCopy';
import SingleButton from 'src/helpers/SingleButton/SingleButton';
import { getEnum } from 'lib/utils';
import ImagesForAll from './ImagesForAll';
import FeaturedImageOnly from './FeaturedImageOnly';
import { ComponentProps } from 'lib/component-props';

export type MashupStyle = 'images-for-all' | 'feature-image-only' | 'no-images';

export type PageMashupProps = Feature.EnterpriseWeb.Components.General.PageMashup.PageMashup &
  ComponentProps;

const PageMashup = (props: PageMashupProps) => {
  const { themeData } = useTheme(PageMashupTheme);
  const MashupStyle = getEnum<MashupStyle>(props.fields?.mashupStyle) ?? 'images-for-all';

  const displayMashupGrid = () => {
    switch (MashupStyle) {
      case 'images-for-all':
        return <ImagesForAll {...props} />;
      case 'feature-image-only':
      case 'no-images':
        return <FeaturedImageOnly {...props} mashupStyle={MashupStyle} />;
      default:
        return <ImagesForAll {...props} />;
    }
  };

  return (
    <Component
      variant="full"
      padding="px-0"
      backgroundVariant={getEnum(props.fields?.backgroundColor)}
      dataComponent="general/pagemashup"
      {...props}
    >
      <div className="col-span-12 py-l">
        <div className="grid-rows-auto grid grid-cols-12  gap-s px-m  md:max-w-screen-lg lg:mx-auto">
          <div className="col-span-12 md:col-span-6">
            <Headline {...props} classes={themeData.classes.sectionheadline} />
          </div>
          <div className="col-span-12 md:col-span-6">
            <BodyCopy {...props} classes={themeData.classes.sectionBody} />
            <SingleButton {...props} classes={themeData.classes.sectionCta} />
          </div>

          {displayMashupGrid()}
        </div>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<PageMashupProps>(PageMashup);
