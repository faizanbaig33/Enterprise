// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import FavoriteProducts from './FavoriteProducts';
import defaultData from './FavoriteProducts.mock-data';

it('renders correctly', () => {
  const component = snapshot(FavoriteProducts, { componentProps: defaultData });
  hasDataComponent(component, 'listing/favoriteproducts');
});
