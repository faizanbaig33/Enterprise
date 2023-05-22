import { Foundation } from 'src/.generated/Foundation.EnterpriseWeb.model';
import ImageWrapper from './ImageWrapper';
import VideoWrapper from './VideoWrapper';
import { LayoutValue, RatioTypes, maxhTypes, maxwTypes } from '.';

export type ImagePrimaryProps = Foundation.EnterpriseWeb.Core.FieldSets.ImageSecondary &
  Foundation.EnterpriseWeb.Core.FieldSets.ImageSecondaryCaption &
  Foundation.EnterpriseWeb.Core.FieldSets.VideoSecondary & {
    imageLayout?: LayoutValue;
    additionalDesktopClasses?: string;
    additionalMobileClasses?: string;
    ratio?: RatioTypes;
    maxH?: maxhTypes;
    maxW?: maxwTypes;
    focusArea?: string;
  };

const MediaSecondary = (props: ImagePrimaryProps): JSX.Element => {
  if (props.fields?.secondaryVideo) {
    return <VideoWrapper videoItem={props.fields?.secondaryVideo} />;
  }

  const params = {
    image: props.fields?.secondaryImage,
    mobileImage: props.fields?.secondaryImageMobile,
    mobileFocusArea: props.fields?.secondaryImageMobileFocusArea,
    caption: props.fields?.secondaryImageCaption,
    imageLayout: props.imageLayout,
    additionalDesktopClasses: props.additionalDesktopClasses,
    additionalMobileClasses: props.additionalMobileClasses,
    ratio: props.ratio,
    maxH: props.maxH,
    maxW: props.maxW,
    focusArea: props.focusArea,
  };

  return <ImageWrapper {...params} />;
};

export default MediaSecondary;
