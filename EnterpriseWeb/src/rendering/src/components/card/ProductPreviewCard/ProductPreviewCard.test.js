// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import ProductPreviewCard from './ProductPreviewCard';
import defaultData from './ProductPreviewCard.mock-data';

it('renders correctly', () => {
  const component = snapshot(ProductPreviewCard, { componentProps: defaultData });
  hasDataComponent(component, 'card/productpreview');
});
