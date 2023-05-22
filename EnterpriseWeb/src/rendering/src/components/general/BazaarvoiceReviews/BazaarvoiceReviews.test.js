// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import BazaarvoiceReviews from './BazaarvoiceReviews';
import defaultData from './BazaarvoiceReviews.mock-data';

it('renders correctly', () => {
  const component = snapshot(BazaarvoiceReviews, { componentProps: defaultData });
  hasDataComponent(component, 'general/bazaarvoicereviews');
});
