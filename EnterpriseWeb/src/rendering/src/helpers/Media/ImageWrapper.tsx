// Global
import { Field, Image as JSSImage, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import NextImage from 'next/image';

// Lib
import { getEnum, useExperienceEditor } from 'lib/utils';
import classNames from 'classnames';
import { ItemExt } from 'lib/_.Sitecore.Override';
import { LayoutValue, RatioTypes, maxhTypes, maxwTypes } from '.';
import EditorAlert from '../ExperienceEditor/EditorAlert';
import { Caption } from '../Caption';

/**
 * JSS does not yet support Next Image in Exprience Editor
 * This component will switch between the two based on environment
 * which allows us to get the various performance benefits from Next Image
 *
 * Note that the images may display slightly differently in
 * Experience Editor as the JSS Image component doesn't have the same layout options
 */

export type ImageWrapperProps = {
  image?: ImageField;
  mobileImage?: ImageField;
  mobileFocusArea?: ItemExt;
  caption?: Field<string>;
  hideCaption?: boolean;
  imageLayout?: LayoutValue;
  additionalDesktopClasses?: string;
  additionalMobileClasses?: string;
  ratio?: RatioTypes;
  maxH?: maxhTypes;
  maxW?: maxwTypes;
  focusArea?: string;
};

const ImageWrapper = ({
  image,
  mobileImage,
  mobileFocusArea,
  caption,
  hideCaption = false,
  imageLayout = 'responsive',
  additionalDesktopClasses,
  additionalMobileClasses,
  ratio = 'video',
  maxH = '',
  maxW = '',
  focusArea = 'center',
}: ImageWrapperProps): JSX.Element => {
  const isEE = useExperienceEditor();

  const imageMessage = `This component renders best using a ${ratio.toUpperCase()} Image Ratio`;

  // If the image has no value, return nothing
  if (isEE) {
    return (
      <>
        <JSSImage field={image} />
        <EditorAlert title="Image Suggestion" message={imageMessage} />
      </>
    );
  }

  if (!image?.value?.src) {
    return <></>;
  }

  if (!ratio) {
    ratio = 'picture';
  }

  if ((maxH || maxW) && !imageLayout) {
    imageLayout = 'responsive';
  }

  let imageCss = imageLayout == 'responsive' ? `aspect-${ratio} ${maxH} ${maxW}` : '';
  imageCss = ratio === 'portrait' ? imageCss + ` ` : imageCss + ` `;
  const mobileObjectPosition = focusArea != '' ? focusArea : getEnum<string>(mobileFocusArea) || '';

  if (imageLayout === 'responsive' || imageLayout === 'intrinsic') {
    return (
      <>
        <div className={classNames('relative hidden md:block', imageCss, additionalDesktopClasses)}>
          <NextImage
            src={`${image.value.src}`}
            alt={`${image.value.alt}`}
            width={`${image.value.width}`}
            height={`${image.value.height}`}
            layout={imageLayout}
          />
        </div>
        <MobileImage
          image={image}
          mobileImage={mobileImage}
          imageLayout={imageLayout}
          additionalMobileClasses={additionalMobileClasses}
          mobileObjectPosition={mobileObjectPosition}
        />
        {!hideCaption && <Caption caption={caption} />}
      </>
    );
  } else {
    const ratioCss = `aspect-${ratio} ${maxH} ${maxW}`;
    return (
      <>
        <div
          className={classNames(
            'relative mx-auto hidden md:block',
            ratioCss,
            additionalDesktopClasses
          )}
        >
          <NextImage
            src={`${image.value.src}`}
            alt={`${image.value.alt}`}
            layout="fill"
            objectFit={ratio === 'portrait' ? 'contain' : 'cover'}
          />
        </div>
        <MobileImage
          image={image}
          mobileImage={mobileImage}
          imageLayout={imageLayout}
          additionalMobileClasses={additionalMobileClasses}
          mobileObjectPosition={mobileObjectPosition}
        />
        {!hideCaption && <Caption caption={caption} />}
      </>
    );
  }
};

export default ImageWrapper;

const MobileImage = ({
  image,
  mobileImage,
  imageLayout = 'responsive',
  additionalMobileClasses,
  mobileObjectPosition,
}: ImageWrapperProps & { mobileObjectPosition: string }): JSX.Element => {
  if (mobileImage?.value?.src) {
    return (
      <div className={classNames('relative block w-full md:hidden', additionalMobileClasses)}>
        <NextImage
          src={`${mobileImage.value.src}`}
          alt={`${mobileImage.value.alt}`}
          width={`${mobileImage.value.width}`}
          height={`${mobileImage.value.height}`}
          layout={imageLayout}
          objectPosition="center"
          objectFit={imageLayout === 'responsive' ? 'contain' : 'cover'}
        />
      </div>
    );
  } else {
    if (image?.value?.src) {
      return (
        <div className={classNames('relative w-full md:hidden', additionalMobileClasses)}>
          <NextImage
            src={`${image.value.src}`}
            alt={`${image.value.alt}`}
            width={`${image.value.width}`}
            height={`${image.value.height}`}
            layout={imageLayout}
            objectPosition={mobileObjectPosition}
            objectFit="cover"
          />
        </div>
      );
    }
  }

  return <></>;
};
