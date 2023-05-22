// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import PromoReviewContentAuthored from './PromoReviewContentAuthored';
import defaultData from './PromoReviewContentAuthored.mock-data';

it('renders correctly', () => {
  const component = snapshot(PromoReviewContentAuthored, { componentProps: defaultData });
  hasDataComponent(component, 'promo/promoreviewcontentauthored');
});
