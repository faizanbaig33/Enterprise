// Global
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import PlaceholderWrapper from 'src/helpers/PlaceholderWrapper/PlaceholderWrapper';

export interface LayoutPageSectionProps {
  fields?: Record<string, never>;
  rendering: ComponentRendering;
}

const LayoutPageSection = ({ fields, rendering }: LayoutPageSectionProps): JSX.Element => {
  // Fail out if we don't have any fields
  if (!fields) {
    return <></>;
  }

  return (
    <div data-component="layout/layoutpagesection">
      <PlaceholderWrapper
        rendering={rendering}
        name="entweb-layout-page-section"
        render={(components) => <>{components}</>}
        renderEmpty={(components) => ({ components })}
      />
    </div>
  );
};

export default LayoutPageSection;
