// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import HeroFeaturedProduct from './HeroFeaturedProduct';
import defaultData from './HeroFeaturedProduct.mock-data';

it('renders correctly', () => {
  const component = snapshot(HeroFeaturedProduct, { componentProps: defaultData });
  hasDataComponent(component, 'hero/herofeaturedproduct');
});
