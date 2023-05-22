// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import StickyBanner from './StickyBanner';
import defaultData from './StickyBanner.mock-data';

it('renders correctly', () => {
  const component = snapshot(StickyBanner, { componentProps: defaultData });
  hasDataComponent(component, 'general/stickybanner');
});
