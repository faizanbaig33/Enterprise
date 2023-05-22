// Global
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import PlaceholderWrapper from 'src/helpers/PlaceholderWrapper/PlaceholderWrapper';

export interface Split2575Props {
  fields?: Record<string, never>;
  rendering: ComponentRendering;
}

const Split2575 = ({ fields, rendering }: Split2575Props): JSX.Element => {
  // Fail out if we don't have any fields
  if (!fields) {
    return <></>;
  }

  return (
    <PlaceholderWrapper
      rendering={rendering}
      name="entweb-layout-split-seventy-five-percent"
      render={(components) => <>{components}</>}
      renderEmpty={(components) => ({ components })}
    />
  );
};

export default Split2575;
