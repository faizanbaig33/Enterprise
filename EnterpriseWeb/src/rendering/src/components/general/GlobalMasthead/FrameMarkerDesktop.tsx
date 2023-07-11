import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

import React, { ReactElement } from 'react';
import { PlaceholderData } from '@sitecore-jss/sitecore-jss/layout';
import { useTheme } from 'lib/context/ThemeContext';
import { GlobalMastheadTheme } from './GlobalMasthead.theme';
import SocialIcons from './SocialIcons';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

type childItem = {
  fields: {
    caption: Field<string>;
  };
  placeholders: PlaceholderData;
};

type RenderingProps = {
  slidesData: childItem[];
};
type FrameMarkerProps = {
  data: any;
  links: any;
} & RenderingProps;

export const FrameMarkerDesktop = ({ data, links }: FrameMarkerProps): ReactElement => {
  const { themeData } = useTheme(GlobalMastheadTheme);

  return (
    <div className={themeData.classes.headWrapper}>
      <div className={themeData.classes.title}>
        Frame{' '}
        <span className="text-black">
          Marker
          <sup className="-top-4 text-[18px]">®</sup>
        </span>
      </div>
      <div className={themeData.classes.anchorWrapper}>
        <SocialIcons icons={data.socialIcons} />
        <div className={themeData.classes.anchors}>
          {links.map((link: any) => (
            <Link href={link.href} key={link.name} passHref>
              <a>
                <span className={themeData.classes.linkTitle}>{link.name}</span>
              </a>
            </Link>
          ))}
        </div>
        <div>
          <Link href="" passHref>
            <a className="flex items-center text-white">
              <span className="text-bold mr-1 text-sm">As seen in</span>
              <FiArrowRight size={16} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
