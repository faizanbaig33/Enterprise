// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import CardImageAndProductDetails from './CardImageAndProductDetails';
import defaultData from './CardImageAndProductDetails.mock-data';

it('renders correctly', () => {
  const component = snapshot(CardImageAndProductDetails, { componentProps: defaultData });
  hasDataComponent(component, 'card/cardimageandproductdetails');
});
