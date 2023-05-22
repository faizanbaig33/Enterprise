import { Placeholder, RouteData } from '@sitecore-jss/sitecore-jss-nextjs';

import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useEffect, useState } from 'react';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { ThemeFile, ThemeName } from 'lib/context/ThemeContext';
import { Subheadline } from 'src/helpers/Subheadline';
import { useTheme } from 'lib/context/ThemeContext';
import { Sizes } from 'src/helpers/SvgIcon/SvgIcon';
import { getBreakpoint, useCurrentScreenType } from 'lib/utils/get-screen-type';
import classNames from 'classnames';
type accordionSectionProps = {
  themeData: ThemeFile[ThemeName];
} & RouteData &
  Feature.EnterpriseWeb.Components.Tabs.Accordion.AccordionSection;

const AccordionSection = (props: accordionSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { themeData } = props;
  const { themeName } = useTheme();
  const { currentScreenWidth } = useCurrentScreenType();

  useEffect(() => {
    const onHashChanges = () => {
      if (typeof window !== 'undefined' && window.location.hash !== '') {
        const hash = window.location.hash.replace('#', '');
        if (props.fields?.sectionAnchorName.value === hash) {
          setIsExpanded(true);
        }
      }
    };

    onHashChanges();
    window.addEventListener('hashchange', onHashChanges);
    return () => {
      window.removeEventListener('hashchange', onHashChanges);
    };
  }, []);

  const renderSectionIcon = (isExpanded: boolean) => {
    let Iconsize: Sizes;

    themeName == 'aw'
      ? (Iconsize = 'lg')
      : (Iconsize = currentScreenWidth >= getBreakpoint('md') ? 'xxl' : 'lg');

    return isExpanded ? (
      <SvgIcon icon="minus" size={Iconsize} className={themeData.classes.sectionIcon} />
    ) : (
      <SvgIcon icon="plus" size={Iconsize} className={themeData.classes.sectionIcon} />
    );
  };

  return (
    <section
      className={classNames(
        themeData.classes.accordionSection,
        !isExpanded ? '[&:last-child_.sectionTitleWrapper]:border-b' : ''
      )}
      id={props.fields?.sectionAnchorName.value}
    >
      <div
        aria-expanded={isExpanded}
        tabIndex={0}
        role="button"
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsExpanded(!isExpanded);
          }
        }}
        className={themeData.classes.sectionTitleWrapper}
      >
        {props.fields && (
          <Subheadline
            useTag=""
            classes={themeData.classes.sectiontitle}
            fields={{
              subheadlineText: props.fields.sectionTitle,
            }}
          />
        )}

        {renderSectionIcon(isExpanded)}
      </div>

      <Placeholder
        name="components"
        rendering={props}
        render={(childComponents) => {
          return childComponents.map((component, index) => (
            <div key={index} className={isExpanded ? themeData.classes.contentWrapper : 'hidden'}>
              {component}
            </div>
          ));
        }}
      />
    </section>
  );
};

export default AccordionSection;
