// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import PromoSwatches from './PromoSwatches';
import defaultData from './PromoSwatches.mock-data.full-width'

it('renders correctly', () => {
  const component = snapshot(PromoSwatches, { componentProps: defaultData });
  hasDataComponent(component, 'promo/promoswatches');
});
