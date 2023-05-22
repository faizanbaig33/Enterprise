import { Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Headline } from '../Headline';
import ImageWrapper, { ImageWrapperProps } from '../Media/ImageWrapper';
import Link from 'next/link';
import { SvgIcon } from '../SvgIcon';
import { useTheme } from 'lib/context/ThemeContext';
import classNames from 'classnames';

export type PhotoItemWithDetailProps = {
  fields: {
    imageWrapper: ImageWrapperProps | string;
    headlineText: Field<string>;
    superscriptCTA: LinkField;
    relatedPages?: any;
    photoItemClasses?: '';
  };
};

const PhotoItemWithDetail = (props: PhotoItemWithDetailProps): JSX.Element => {
  const { themeName } = useTheme();

  const { imageWrapper, relatedPages } = props.fields;

  return (
    <div className="flex flex-col md:flex-row">
      <div
        className={classNames(
          'max-h-[520px]',
          relatedPages?.length > 0 ? 'max-w-[924px] basis-4/5' : 'basis-full'
        )}
      >
        <ImageWrapper
          imageLayout="intrinsic"
          ratio="portrait"
          {...(imageWrapper as ImageWrapperProps)}
        />
      </div>
      {relatedPages?.length > 0 && (
        <div className="flex basis-1/5 flex-col md:ml-s">
          <Headline
            classes={classNames(
              'mt-s md:mt-xxs',
              themeName === 'aw'
                ? 'font-heavy text-sm-xs md:text-xs mb-s'
                : '!font-serif font-bold text-xs mb-m md:mb-s'
            )}
            useTag="p"
            {...props}
          />
          {relatedPages.map((pageItem: any, index: number) => {
            return (
              <div key={index} className="mb-m flex items-center text-body md:mb-s">
                <Link href={pageItem.url}>
                  {pageItem.fields?.pageTitle?.value || pageItem.pageTitle}
                </Link>
                <SvgIcon icon="arrow" className="ml-xxxs text-primary" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default PhotoItemWithDetail;
