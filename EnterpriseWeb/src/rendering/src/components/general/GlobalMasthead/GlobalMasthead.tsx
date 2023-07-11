// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { Component } from 'src/helpers/Component';
import { GlobalMastheadTheme } from './GlobalMasthead.theme';
import classNames from 'classnames';
import { FrameMarkerDesktop } from './FrameMarkerDesktop';
import { FrameMarkerMobile } from './FrameMarkerMobile';
import { BlogNavDesktop } from './BlogNavDesktop';
import { BlogNavMobile } from './BlogNavMobile';

const FRAME_MARKER_LINKS = [
  {
    href: '',
    name: 'Company news',
  },
  {
    href: '',
    name: 'Communities',
  },
  {
    href: '',
    name: 'Inclusion',
  },
  {
    href: '',
    name: 'Innovations',
  },
  {
    href: '',
    name: 'All posts',
  },
];

const BLOG_NAV_LINKS = [
  {
    href: '',
    name: 'Tips',
  },
  {
    href: '',
    name: 'Trends',
  },
  {
    href: '',
    name: 'Ideas',
  },
  {
    href: '',
    name: 'Projects',
  },
  {
    href: '',
    name: 'All posts',
  },
];

export type GlobalMastheadProps = Feature.EnterpriseWeb.Components.General.GlobalMasthead;
const GlobalMasthead = (props: GlobalMastheadProps) => {
  const { themeData } = useTheme(GlobalMastheadTheme);

  return (
    <>
      <div className="sticky bg-primary">
        <Component variant="lg" dataComponent="general/globalmasthead" {...props}>
          <div className={classNames('col-span-12')}>
            <div className="hidden md:block">
              <FrameMarkerDesktop data={props.fields} links={FRAME_MARKER_LINKS} />
            </div>
            <div className="md:hidden">
              <FrameMarkerMobile data={props.fields} links={FRAME_MARKER_LINKS} />
            </div>
          </div>
        </Component>
      </div>
      <div className="sticky bg-gray">
        <Component variant="lg" dataComponent="general/globalmasthead" {...props}>
          <div className={classNames('col-span-12')}>
            <div className="hidden md:block">
              <BlogNavDesktop data={props.fields} links={BLOG_NAV_LINKS} />
            </div>
            <div className="md:hidden">
              <BlogNavMobile data={props.fields} links={BLOG_NAV_LINKS} />
            </div>
          </div>
        </Component>
      </div>
    </>
  );
};

export default withDatasourceCheck()<GlobalMastheadProps>(GlobalMasthead);
