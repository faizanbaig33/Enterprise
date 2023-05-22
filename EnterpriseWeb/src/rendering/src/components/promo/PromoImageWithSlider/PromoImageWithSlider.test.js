// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import PromoImageWithSlider from './PromoImageWithSlider';
import defaultData from './PromoImageWithSlider.full-width.mock-data';

it('renders correctly', () => {
  const component = snapshot(PromoImageWithSlider, { componentProps: defaultData });
  hasDataComponent(component, 'promo/promoimagewithslider');
});
