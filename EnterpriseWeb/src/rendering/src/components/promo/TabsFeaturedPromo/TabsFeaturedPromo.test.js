// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import TabsFeaturedPromo from './TabsFeaturedPromo';
import defaultData from './TabsFeaturedPromo.mock-data';

it('renders correctly', () => {
  const component = snapshot(TabsFeaturedPromo, { componentProps: defaultData });
  hasDataComponent(component, 'promo/tabsfeaturedpromo');
});
