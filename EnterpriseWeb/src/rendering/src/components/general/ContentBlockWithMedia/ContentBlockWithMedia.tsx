import { Component } from 'src/helpers/Component';
import { Headline } from 'src/helpers/Headline';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import RichTextWrapper from 'src/helpers/RichTextWrapper/RichTextWrapper';
import { MediaPrimary, MediaSecondary } from 'src/helpers/Media';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { ContentBlockWithMediaTheme } from './ContentBlockWithMedia.theme';
import { useExperienceEditor } from 'lib/utils';
import { getBreakpoint, useCurrentScreenType } from 'lib/utils/get-screen-type';
import { getEnum } from 'lib/utils';
import { ComponentSizeVariants } from 'src/helpers/Component/Component';

export type ContentBlockWithMediaProps =
  Feature.EnterpriseWeb.Components.General.ContentBlockWithMedia.ContentBlockWithMedia;

const ContentBlockWithMedia = (props: ContentBlockWithMediaProps): JSX.Element => {
  const isEE = useExperienceEditor();
  const { themeData } = useTheme(ContentBlockWithMediaTheme(props));
  const { currentScreenWidth } = useCurrentScreenType();

  const componentWidth = getEnum<ComponentSizeVariants>(props.fields?.componentMaxWidth) || 'ml';

  // Fail out if we don't have any fields
  if (!props) {
    return <></>;
  }

  const imageLayoutType =
    props.fields?.primaryImage?.value?.src &&
    !props.fields?.secondaryImage?.value?.src &&
    currentScreenWidth >= getBreakpoint('md')
      ? 'intrinsic'
      : 'responsive';

  const imageContainerWidth =
    imageLayoutType === 'intrinsic'
      ? { maxWidth: `${props.fields?.primaryImage?.value?.width}px` }
      : {};

  const focusArea = 'top center';

  return (
    <Component variant={componentWidth} dataComponent="general/contentblockwithmedia" {...props}>
      <div className="col-span-12 grid grid-cols-12 md:gap-x-s">
        <div className={themeData.classes.headingContainer}>
          <Headline defaultTag="h2" classes={themeData.classes.headlineContainer} {...props} />
          <RichTextWrapper
            field={props.fields?.topCopy}
            className={themeData.classes.topCopyContainer}
          />
        </div>
        <div className={themeData.classes.bodyContainer}>
          <div className={themeData.classes.imageContainer}>
            {(props.fields?.primaryImage?.value?.src || isEE) && (
              <div className={themeData.classes.imageOuterContainer} style={imageContainerWidth}>
                <MediaPrimary {...props} imageLayout={imageLayoutType} focusArea={focusArea} />
              </div>
            )}
            {(props.fields?.secondaryImage?.value?.src || isEE) && (
              <div className={themeData.classes.imageOuterContainer} style={imageContainerWidth}>
                <MediaSecondary {...props} imageLayout={imageLayoutType} focusArea={focusArea} />
              </div>
            )}
          </div>
          <RichTextWrapper
            classes={themeData.classes.bodyContainer}
            field={props.fields?.bottomCopy}
          />
        </div>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<ContentBlockWithMediaProps>(ContentBlockWithMedia);
