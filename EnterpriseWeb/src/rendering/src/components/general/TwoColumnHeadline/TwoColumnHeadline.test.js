// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import TwoColumnHeadline from './TwoColumnHeadline';
import defaultData from './TwoColumnHeadline.mock-data';

it('renders correctly', () => {
  const component = snapshot(TwoColumnHeadline, { componentProps: defaultData });
  hasDataComponent(component, 'general/twocolumnheadline');
});
