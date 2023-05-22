// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import LayoutPageSection from './LayoutPageSection';
import defaultData from './LayoutPageSection.mock-data';

it('renders correctly', () => {
  const component = snapshot(LayoutPageSection, { componentProps: defaultData });
  // hasDataComponent(component, '/layout/layoutpagesection');
});
