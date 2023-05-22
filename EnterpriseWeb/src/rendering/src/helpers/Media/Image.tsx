// Global
import { Image as JSSImage, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import NextImage from 'next/image';

// Lib
import { useExperienceEditor } from 'lib/utils';
import { FocusAreaValue, LayoutValue } from '.';

/**
 * JSS does not yet support Next Image in Exprience Editor
 * This component will switch between the two based on environment
 * which allows us to get the various performance benefits from Next Image
 *
 * Note that the images may display slightly differently in
 * Experience Editor as the JSS Image component doesn't have the same layout options
 */

export type ImageProps = {
  image?: ImageField;
  layout?: LayoutValue;
  focus?: FocusAreaValue;
};

const Image = ({ image, layout = 'responsive', focus = 'center' }: ImageProps): JSX.Element => {
  const isEE = useExperienceEditor();

  // If the image has no value, return nothing
  if (isEE) {
    return (
      <>
        <JSSImage field={image} />
      </>
    );
  }

  if (!image?.value?.src) {
    return <></>;
  }

  return (
    <NextImage
      src={`${image.value.src}`}
      alt={`${image.value.alt}`}
      width={`${image.value.width}`}
      height={`${image.value.height}`}
      layout={layout}
      objectPosition={focus}
      objectFit="cover"
    />
  );
};

export default Image;
