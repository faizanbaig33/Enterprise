// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import PromoGeneric from './PromoGeneric';
import { leftImage, rightImage } from './PromoGeneric.mock-data';

it('leftImage renders correctly', () => {
  const component = snapshot(PromoGeneric, { componentProps: leftImage });
  hasDataComponent(component, 'general/promogeneric');
});

it('rightImage renders correctly', () => {
  const component = snapshot(PromoGeneric, { componentProps: rightImage });
  hasDataComponent(component, 'general/promogeneric');
});
