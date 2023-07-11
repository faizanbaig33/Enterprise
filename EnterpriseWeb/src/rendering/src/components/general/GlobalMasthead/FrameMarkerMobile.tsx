import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

import React, { ReactElement, useState } from 'react';
import { PlaceholderData } from '@sitecore-jss/sitecore-jss/layout';
import { useTheme } from 'lib/context/ThemeContext';
import { GlobalMastheadTheme } from './GlobalMasthead.theme';
import SocialIcons from './SocialIcons';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

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

export const FrameMarkerMobile = ({ data, links }: FrameMarkerProps): ReactElement => {
  const { themeData } = useTheme(GlobalMastheadTheme);

  const [isShow, setIsShow] = useState(false);

  return (
    <div className={themeData.classes.headWrapper}>
      <div className={themeData.classes.title}>
        <div onClick={() => setIsShow(!isShow)} className={themeData.classes.menuIcon}>
          {!isShow ? <IoIosArrowDropdown size={32} /> : <IoIosArrowDropup size={32} />}
        </div>
        Frame{' '}
        <span className="text-black">
          Marker<sup className="-top-2 text-[14px]">®</sup>
        </span>
      </div>
      {isShow && (
        <div className={themeData.classes.anchorWrapper}>
          <div className={themeData.classes.anchors}>
            {links.map((link: any) => (
              <Link href={link.href} key={link.name} passHref>
                <a>
                  <span className={themeData.classes.linkTitle}>{link.name}</span>
                </a>
              </Link>
            ))}
          </div>
          <SocialIcons icons={data.socialIcons} />
          <div className="mt-4">
            <Link href="" passHref>
              <a className="flex items-center text-white">
                <span className="text-bold mr-1 text-sm">As seen in</span>
                <FiArrowRight size={16} />
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
