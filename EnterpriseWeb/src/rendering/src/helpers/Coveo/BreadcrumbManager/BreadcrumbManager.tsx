import { BreadcrumbManager as HeadlessBreadcrumbManager } from '@coveo/headless';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { useEffect, useState, FunctionComponent } from 'react';
import { Headline } from 'src/helpers/Headline';

interface BreadcrumbManagerProps {
  controller: HeadlessBreadcrumbManager;
  breadcrumbClasses?: {
    [property: string]: any;
  };
  facetSectionHeading: Field<string>;
  clearAllLabel: Field<string>;
}

export const BreadcrumbManager: FunctionComponent<BreadcrumbManagerProps> = (props) => {
  const { controller, breadcrumbClasses, facetSectionHeading, clearAllLabel } = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => {
    controller.subscribe(() => setState(controller.state));
  }, [controller]);

  return (
    <div className={breadcrumbClasses?.wrapperClass}>
      <Headline
        classes={breadcrumbClasses?.titleClass}
        useTag="h3"
        fields={{
          headlineText: facetSectionHeading,
          superscriptCTA: {
            value: {
              href: '',
            },
          },
        }}
      />
      <button
        className={breadcrumbClasses?.ctaClass}
        disabled={state.facetBreadcrumbs.length < 1}
        onClick={() => controller.deselectAll()}
      >
        {clearAllLabel.value}
      </button>
    </div>
  );
};
