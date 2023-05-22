// Global
import dynamic from 'next/dynamic';
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Components
import IconNewTab from 'src/helpers/SvgIcon/icons/icon--new-tab';
// Local
import PromoMediaBackground from './PromoMediaBackground';
import defaultData from './PromoMediaBackground.mock-data';

// Mock out the SvgIcon dynamic import
jest.mock('next/dynamic');

beforeAll(() => {
  dynamic.mockImplementation(() => IconNewTab);
});
it('renders correctly', () => {
  const component = snapshot(PromoMediaBackground, { componentProps: defaultData });
  hasDataComponent(component, 'promo/promomediabackground');
});
