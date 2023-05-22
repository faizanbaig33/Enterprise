import { Foundation } from 'src/.generated/Foundation.EnterpriseWeb.model';
import ImageWrapper from './ImageWrapper';
import { LayoutValue, RatioTypes, maxhTypes, maxwTypes } from '.';

export type ImagePrimaryProps = Foundation.EnterpriseWeb.Core.FieldSets.ImagePrimary &
  Foundation.EnterpriseWeb.Core.FieldSets.ImagePrimaryCaption & {
    hideCaption?: boolean;
    imageLayout?: LayoutValue;
    additionalDesktopClasses?: string;
    additionalMobileClasses?: string;
    ratio?: RatioTypes;
    maxH?: maxhTypes;
    maxW?: maxwTypes;
    focusArea?: string;
  };

const ImagePrimary = (props: ImagePrimaryProps): JSX.Element => {
  const params = {
    image: props.fields?.primaryImage,
    mobileImage: props.fields?.primaryImageMobile,
    mobileFocusArea: props.fields?.primaryImageMobileFocusArea,
    caption: props.fields?.primaryImageCaption,
    hideCaption: props.hideCaption,
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

export default ImagePrimary;
