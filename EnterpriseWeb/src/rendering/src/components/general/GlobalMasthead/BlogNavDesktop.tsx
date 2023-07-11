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
type BlogNavProps = {
  data: any;
  links: any;
} & RenderingProps;

export const BlogNavDesktop = ({ data, links }: BlogNavProps): ReactElement => {
  const { themeData } = useTheme(GlobalMastheadTheme);
  return (
    <div className={themeData.classes.headWrapper}>
      <div className={themeData.classes.title}>
        <span className="font-normal text-white">Endless</span>{' '}
        <span className="ml-3 font-bold text-white">Expression</span>
      </div>
      <div className={themeData.classes.anchorWrapper}>
        <SocialIcons icons={data.socialIcons} />
        <div className={(themeData.classes.anchors, 'space-x-[40px]')}>
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
