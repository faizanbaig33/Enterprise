// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import GlobalMasthead from './GlobalMasthead';
import defaultData from './GlobalMasthead.mock-data';

it('renders correctly', () => {
  const component = snapshot(GlobalMasthead, { componentProps: defaultData });
  hasDataComponent(component, 'general/globalmasthead');
});
