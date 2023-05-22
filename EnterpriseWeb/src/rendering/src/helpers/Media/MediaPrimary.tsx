import { Foundation } from 'src/.generated/Foundation.EnterpriseWeb.model';
import ImageWrapper from './ImageWrapper';
import VideoWrapper from './VideoWrapper';
import { LayoutValue, RatioTypes, maxhTypes, maxwTypes } from '.';

export type ImagePrimaryProps = Foundation.EnterpriseWeb.Core.FieldSets.ImagePrimary &
  Foundation.EnterpriseWeb.Core.FieldSets.ImagePrimaryCaption &
  Foundation.EnterpriseWeb.Core.FieldSets.VideoPrimary & {
    imageLayout?: LayoutValue;
    additionalDesktopClasses?: string;
    additionalMobileClasses?: string;
    ratio?: RatioTypes;
    maxH?: maxhTypes;
    maxW?: maxwTypes;
    focusArea?: string;
  };

const MediaPrimary = (props: ImagePrimaryProps): JSX.Element => {
  if (props.fields?.primaryVideo) {
    return <VideoWrapper videoItem={props.fields?.primaryVideo} />;
  }

  const params = {
    image: props.fields?.primaryImage,
    mobileImage: props.fields?.primaryImageMobile,
    mobileFocusArea: props.fields?.primaryImageMobileFocusArea,
    caption: props.fields?.primaryImageCaption,
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

export default MediaPrimary;
